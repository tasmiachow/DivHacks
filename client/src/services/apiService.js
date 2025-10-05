const API_BASE_URL = 'http://localhost:5000/api';

async function startSession(hostName, hostAddress, venueType) {
    const response = await fetch(`${API_BASE_URL}/session/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostName, hostAddress, venueType })
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to start session.');
    }
    return await response.json();
}

async function joinSession(sessionId, participantName, participantAddress) {
    const response = await fetch(`${API_BASE_URL}/session/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, participantName, participantAddress })
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to join session.');
    }
    return await response.json();
}

async function getSessionDetails(sessionId) {
    const response = await fetch(`${API_BASE_URL}/session/${sessionId}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to get session details.');
    }
    return await response.json();
}

async function calculateResults(sessionId) {
    const response = await fetch(`${API_BASE_URL}/session/${sessionId}/calculate`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to calculate results.');
    }
    const data = await response.json();
    return data;  // return the whole object, not just data.results
}

// THIS LINE IS THE FIX. IT NOW INCLUDES ALL FOUR FUNCTIONS.
export { startSession, joinSession, getSessionDetails, calculateResults };