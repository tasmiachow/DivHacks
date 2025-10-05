import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// --- THIS IS THE NEW, SECURE WAY ---
// Vite (your frontend tool) automatically reads the .env file in your client folder
// and makes any variable starting with "VITE_" available here.
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// --- STYLING for the Map Component ---
const mapContainerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: '15px'
};

function ResultsPage() {
  const location = useLocation();
  const { results, aiSummary } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % results.length);
  };

  if (!results || results.length === 0) {
    return <div className="py-5 min-vh-100 bg-light"><Container><Alert variant="warning" className="mt-5">No results found.</Alert></Container></div>;
  }

  // This is a safety check. If the API key didn't load, we show a clear error.
  if (!GOOGLE_MAPS_API_KEY) {
    return <div className="py-5 min-vh-100 bg-light"><Container><Alert variant="danger" className="mt-5">Configuration Error: The Google Maps API Key is missing. Make sure it's in your client/.env file.</Alert></Container></div>;
  }

  const currentSpot = results[currentIndex];
  const summarySentences = aiSummary ? aiSummary.split(/\d+\.\s/) : [];
  const currentSummary = summarySentences[currentIndex + 1] || '';
  
  return (
    <div className="py-5 min-vh-100 bg-light">
      <Container fluid className="pt-5">
        <h2 className="mb-4 fw-bold text-center">Your Top Meetup Spots!</h2>
        <Row>
          {/* LEFT SIDE: The Details Panel */}
          <Col md={5}>
            <Card className="h-100 shadow-lg p-3" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title className="fw-bold display-6">{currentIndex + 1}. {currentSpot.name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{currentSpot.address}</Card.Subtitle>
                <Alert variant="info">
                <strong>AI Summary:</strong> {currentSummary.trim()}
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

          {/* RIGHT SIDE: The Google Map */}
          <Col md={7}>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={currentSpot.location}
              >
                {results.map((spot, index) => (
                  <Marker
                    key={spot.place_id}
                    position={spot.location}
                    label={(index + 1).toString()}
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