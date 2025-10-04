import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { startSession } from "../services/apiService";

function StartHost() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [venueType, setVenueType] = useState("cafe");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await startSession(name, location, venueType);
      navigate(`/session/${data.sessionId}`); // Navigate to the lobby
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="py-5 min-vh-100 bg-light">
      <Container>
        <h2 className="pt-5 mb-4 text-center fw-bold">Start a New Session</h2>
        <Row className="justify-content-center"><Col xs={12} md={8} lg={6}><Form onSubmit={handleSubmit} className="shadow-sm p-4 rounded bg-white">
          <Form.Group className="mb-3"><Form.Label>Your Name</Form.Label><Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Your Location</Form.Label><Form.Control type="text" placeholder="Enter your address" value={location} onChange={(e) => setLocation(e.target.value)} required /></Form.Group>
          <Form.Group className="mb-4"><Form.Label>Meetup Spot</Form.Label><Form.Select value={venueType} onChange={(e) => setVenueType(e.target.value)}><option value="cafe">Cafe ☕</option><option value="restaurant">Restaurant 🍝</option></Form.Select></Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="d-grid"><Button variant="primary" size="lg" type="submit">Create Session</Button></div>
        </Form></Col></Row>
      </Container>
    </div>
  );
}
export default StartHost;