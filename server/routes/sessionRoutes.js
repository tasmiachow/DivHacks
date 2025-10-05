const express = require('express');
const router = express.Router();
const { geocodeAddress, findNearbyPlaces, getTravelTimes } = require('../services/googleMapsService');
const { calculateCentroid, rankVenues } = require('../services/fairnessService');

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


router.get('/:id/calculate', async (req, res) => {
  const sessionId = req.params.id;
  const session = sessions[sessionId];
  if (!session) return res.status(404).json({ msg: 'Session not found.' });
  if (session.participants.length < 2) return res.status(400).json({ msg: 'Need at least two people.' });
  try {
    const geocodingPromises = session.participants.map(p => geocodeAddress(p.address));
    const locations = await Promise.all(geocodingPromises);
    session.participants.forEach((p, i) => { if (locations[i]) { p.lat = locations[i].lat; p.lng = locations[i].lng; } });
    const centroid = calculateCentroid(session.participants);
    if (!centroid) return res.status(400).json({ msg: 'Could not calculate center point.' });
    const candidateVenues = await findNearbyPlaces(centroid, session.venueType);
    if (candidateVenues.length === 0) return res.status(404).json({ msg: `No ${session.venueType}s found.` });
    const origins = session.participants.map(p => ({ lat: p.lat, lng: p.lng }));
    const destinations = candidateVenues.map(v => v.location);
    const travelData = await getTravelTimes(origins, destinations);
    if (!travelData) return res.status(500).json({ msg: 'Could not calculate travel times.' });
    const enrichedVenues = candidateVenues.map((venue, vIndex) => ({ ...venue, travelInfo: session.participants.map((p, pIndex) => ({ participantName: p.name, durationText: travelData.rows[pIndex].elements[vIndex].duration?.text || 'N/A', durationSeconds: travelData.rows[pIndex].elements[vIndex].duration?.value ?? Infinity, })), }));
    const rankedResults = rankVenues(enrichedVenues, 'max');
    const top3Results = rankedResults.slice(0, 3);
    session.results = top3Results;
    res.status(200).json({ msg: 'Calculation complete!', results: top3Results });
  } catch (error) {
    console.error('Error during calculation:', error);
    res.status(500).json({ msg: 'Server error during calculation.' });
  }
});

module.exports = router;