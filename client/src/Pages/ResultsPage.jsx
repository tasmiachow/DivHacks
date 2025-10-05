import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// --- IMPORTANT: You need to put your Google Maps API key here ---
// For a hackathon, it's okay to paste it here. For a real app, this would be in a .env file.
const GOOGLE_MAPS_API_KEY = "AIzaSyC9XBqIgss1JbQ11gaVUEUyFuOAG88mKmk";

// --- STYLING for the Map Component ---
const mapContainerStyle = {
  width: '100%',
  height: '80vh', // 80% of the viewport height
  borderRadius: '15px'
};

function ResultsPage() {
  const location = useLocation();
  const results = location.state?.results;

  // --- STATE MANAGEMENT ---
  // We use state to keep track of which result we are currently showing (0, 1, or 2).
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- EVENT HANDLER for the "Next" button ---
  const handleNext = () => {
    // This clever line cycles through the results: 0 -> 1 -> 2 -> 0 -> 1 ...
    setCurrentIndex((prevIndex) => (prevIndex + 1) % results.length);
  };

  // If there are no results, show an error.
  if (!results || results.length === 0) {
    return <div className="py-5 min-vh-100 bg-light"><Container><Alert variant="warning" className="mt-5">No results found.</Alert></Container></div>;
  }

  // Get the currently selected spot based on the index.
  const currentSpot = results[currentIndex];

  return (
    <div className="py-5 min-vh-100 bg-light">
      <Container fluid className="pt-5">
        <h2 className="mb-4 fw-bold text-center">Your Top Meetup Spots!</h2>
        <Row>
          {/* --- LEFT SIDE: The Details Panel --- */}
          <Col md={5}>
            <Card className="h-100 shadow-lg p-3" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title className="fw-bold display-6">{currentIndex + 1}. {currentSpot.name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{currentSpot.address}</Card.Subtitle>
                <Alert variant="info">
                  <strong>Fairness Score:</strong> This is the #<strong>{currentIndex + 1}</strong> best spot, minimizing the longest travel time.
                </Alert>
                <hr />
                <Card.Text as="div">
                  <strong className="fs-5">Travel Times:</strong>
                  <ul className="list-unstyled mt-2">
                    {currentSpot.travelInfo.map((info, i) => (
                      <li key={i} className="mb-1">
                        <strong>{info.participantName}:</strong> {info.durationText}
                      </li>
                    ))}
                  </ul>
                </Card.Text>
                <div className="d-grid mt-4">
                  <Button variant="primary" size="lg" onClick={handleNext}>
                    Next Recommendation →
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* --- RIGHT SIDE: The Google Map --- */}
          <Col md={7}>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={currentSpot.location} // The map will center on the currently selected spot
              >
                {/* We loop through ALL results to place a pin for each one */}
                {results.map((spot, index) => (
                  <Marker
                    key={spot.place_id}
                    position={spot.location}
                    label={(index + 1).toString()} // Label the pins "1", "2", "3"
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResultsPage;