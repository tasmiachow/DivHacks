/**
 * This file will hold all the core logic for calculating "fairness".
 */

/**
 * Calculates the geographical center (centroid) from a list of coordinates.
 * (This function is unchanged)
 */
function calculateCentroid(participants) {
  if (!participants || participants.length === 0) {
    return null;
  }
  const validParticipants = participants.filter(p => p.lat != null && p.lng != null);
  if (validParticipants.length === 0) {
    return null;
  }
  const total = validParticipants.reduce((acc, curr) => {
    acc.lat += curr.lat;
    acc.lng += curr.lng;
    return acc;
  }, { lat: 0, lng: 0 });
  return {
    lat: total.lat / validParticipants.length,
    lng: total.lng / validParticipants.length,
  };
}

/**
 * --- NEW FUNCTION ---
 * Ranks venues based on travel time fairness.
 * @param {Array<object>} venues - The array of venues, enriched with travelInfo.
 * @param {string} mode - The fairness mode ('max' or 'total').
 * @returns {Array<object>} The sorted array of venues.
 */

function rankVenues(venues, mode = 'max') {
  const scoredVenues = venues.map(venue => {
    const times = venue.travelInfo.map(info => info.durationSeconds);
    const totalTime = times.reduce((a, b) => a + b, 0);
    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);
    const difference = maxTime - minTime; // fairness deviation

    return {
      ...venue,
      totalTimeSeconds: totalTime,
      maxTimeSeconds: maxTime,
      differenceSeconds: difference,
    };
  });

  if (mode === 'total') {
    // Group fairness — minimize total travel time
    scoredVenues.sort((a, b) => a.totalTimeSeconds - b.totalTimeSeconds);
  } else {
    // Individual fairness — prioritize the most balanced travel times
    scoredVenues.sort((a, b) => {
      // Primary: minimize the difference between participants
      if (a.differenceSeconds !== b.differenceSeconds) {
        return a.differenceSeconds - b.differenceSeconds;
      }
      // Secondary: minimize the longest single travel time
      return a.maxTimeSeconds - b.maxTimeSeconds;
    });
  }

  return scoredVenues;
}

module.exports = { calculateCentroid, rankVenues };