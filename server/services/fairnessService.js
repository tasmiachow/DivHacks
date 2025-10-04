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
  // First, calculate a score for each venue.
  const scoredVenues = venues.map(venue => {
    // Calculate the total travel time for this venue (sum of all trips in seconds).
    const totalTime = venue.travelInfo.reduce((sum, info) => sum + info.durationSeconds, 0);

    // Find the longest single trip to this venue in seconds.
    const maxTime = Math.max(...venue.travelInfo.map(info => info.durationSeconds));

    // Return a new object with the scores attached.
    return {
      ...venue,
      totalTimeSeconds: totalTime,
      maxTimeSeconds: maxTime,
    };
  });

  // Now, sort the venues based on the chosen mode.
  if (mode === 'total') {
    // Sort by the lowest total group travel time.
    scoredVenues.sort((a, b) => a.totalTimeSeconds - b.totalTimeSeconds);
  } else {
    // Default to sorting by the lowest maximum individual travel time.
    scoredVenues.sort((a, b) => a.maxTimeSeconds - b.maxTimeSeconds);
  }

  return scoredVenues;
}

// Export both functions so we can use them elsewhere.
module.exports = { calculateCentroid, rankVenues };