const express = require('express');
const router = express.Router();
const { geocodeAddress, findNearbyPlaces, getTravelTimes } = require('../services/googleMapsService');
const { calculateCentroid, rankVenues } = require('../services/fairnessService');
const { getAISummary } = require('../agents/graph');


let sessions = {};

function generateSessionCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

router.post('/start', (req, res) => {
    const { hostName, hostAddress, venueType } = req.body;
    if (!hostName || !hostAddress || !venueType) return res.status(400).json({ msg: 'Please provide host name, address, and venue type.' });
    const sessionId = generateSessionCode();
    sessions[sessionId] = { venueType, participants: [{ name: hostName, address: hostAddress, lat: null, lng: null }] };
    console.log(`[SESSION STARTED] ID: ${sessionId}, Host: ${hostName}`);
    res.status(201).json({ sessionId, sessionData: sessions[sessionId] });
});

router.post('/join', (req, res) => {
    const { sessionId, participantName, participantAddress } = req.body;
    if (!sessionId || !participantName || !participantAddress) return res.status(400).json({ msg: 'Please provide session ID, participant name, and address.' });
    const session = sessions[sessionId];
    if (!session) return res.status(404).json({ msg: 'Session not found. Please check the code.' });
    session.participants.push({ name: participantName, address: participantAddress, lat: null, lng: null });
    console.log(`[PARTICIPANT JOINED] ID: ${sessionId}, Name: ${participantName}`);
    res.status(200).json({ msg: 'Participant added!', sessionData: session });
});

// --- THIS IS THE NEW ENDPOINT FOR THE LOBBY ---
/**
 * @route   GET /:id
 * @desc    Gets the current details and participant list for a session.
 */
router.get('/:id', (req, res) => {
    const session = sessions[req.params.id];
    if (session) {
        console.log(`[FETCHED DETAILS] for session ${req.params.id}`);
        res.status(200).json(session);
    } else {
        res.status(404).json({ msg: 'Session not found.' });
    }
});


/**
 * @route   GET /:id/calculate
 * @desc    Performs geocoding, nearby search, travel time calculations, and fairness ranking.
 *          Returns the top 3 fairest venues for the group.
 * 
 * Example:
 *   GET /api/session/1234/calculate
 *   GET /api/session/1234/calculate?mode=total   ← switches to Group Fairness
 */
router.get('/:id/calculate', async (req, res) => {
  const sessionId = req.params.id;
  const session = sessions[sessionId];

  if (!session) return res.status(404).json({ msg: 'Session not found.' });
  if (session.participants.length < 2) return res.status(400).json({ msg: 'Need at least two people.' });

  // Determine fairness mode: 'max' (individual) is default; 'total' can be passed via query
  const fairnessMode = req.query.mode === 'total' ? 'total' : 'max';
  console.log(`[CALCULATION STARTED] Session: ${sessionId}, Mode: ${fairnessMode}`);

  try {
    // 1️⃣ Geocode all participant addresses
    const geocodingPromises = session.participants.map(p => geocodeAddress(p.address));
    const locations = await Promise.all(geocodingPromises);

    session.participants.forEach((p, i) => {
      if (locations[i]) {
        p.lat = locations[i].lat;
        p.lng = locations[i].lng;
      }
    });
    console.log('[GEOCODING COMPLETE]');

    // 2️⃣ Calculate centroid of all participant locations
    const centroid = calculateCentroid(session.participants);
    if (!centroid) return res.status(400).json({ msg: 'Could not calculate center point.' });
    console.log('[CENTROID CALCULATED]');

    // 3️⃣ Find candidate venues (e.g., cafes) near the centroid
    let candidateVenues = await findNearbyPlaces(centroid, session.venueType);
    if (candidateVenues.length === 0) {
      return res.status(404).json({ msg: `No ${session.venueType}s found.` });
    }
    console.log(`[FOUND ${candidateVenues.length} VENUES BEFORE FILTERING]`);
    
    // 🚫 Filter out unwanted chains (McDonald's, Dunkin', etc.)
    const excludedKeywords = ["mcdonald", "dunkin", "kfc", "burger king", "taco bell", "chipotle"];
    const seen = new Set();
    candidateVenues = candidateVenues.filter(v => {
      const lowerName = v.name.toLowerCase();
      const isExcluded = excludedKeywords.some(keyword => lowerName.includes(keyword));
      const isDuplicate = seen.has(lowerName);
      if (!isExcluded && !isDuplicate) {
        seen.add(lowerName);
        return true;
      }
      return false;
    });

    // 4️⃣ Calculate travel times for each participant to each candidate venue
    const origins = session.participants.map(p => ({ lat: p.lat, lng: p.lng }));
    const destinations = candidateVenues.map(v => v.location);

    const travelData = await getTravelTimes(origins, destinations);
    if (!travelData) return res.status(500).json({ msg: 'Could not calculate travel times.' });

    const enrichedVenues = candidateVenues.map((venue, vIndex) => ({
      ...venue,
      travelInfo: session.participants.map((p, pIndex) => {
        const element = travelData.rows[pIndex].elements[vIndex];
        return {
          participantAddress: p.address,
          durationText: element.duration?.text || 'N/A',
          durationSeconds: element.duration?.value ?? Infinity,
        };
      }),
    }));
    console.log('[TRAVEL TIMES CALCULATED]');

    // 5️⃣ Rank venues based on chosen fairness mode
    const rankedResults = rankVenues(enrichedVenues, fairnessMode);
    const top3Results = rankedResults.slice(0, 3);
    console.log(`[RANKING COMPLETE] Top result: ${top3Results[0]?.name || 'None'}`);

    // 6️⃣ (Optional) AI summary — hook this in if ready
    const aiSummary = await getAISummary(
      top3Results.map(v => ({
        name: v.name,
        travelTimes: v.travelInfo.map(info => Math.round(info.durationSeconds / 60)), // convert to minutes
      })),
      fairnessMode === 'max' ? 'Equal Travel Time' : 'Group Efficiency'
    );

    // ✅ Final response
    res.status(200).json({
      msg: 'Calculation complete! Here are the top 3 fairest spots.',
      mode: fairnessMode === 'max' ? 'individual' : 'group',
      results: top3Results,
      aiSummary,
      
    });


  } catch (error) {
    console.error('Error during calculation:', error);
    res.status(500).json({ msg: 'Server error during calculation.' });
  }
});


module.exports = router;