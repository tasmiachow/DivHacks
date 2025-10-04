import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
import { getSessionDetails, calculateResults } from '../services/apiService';

function SessionLobby() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);

  const handleRefresh = useCallback(async () => {
    setError(null);
    try {
      const data = await getSessionDetails(sessionId);
      setSessionData(data);
    } catch (err) {
      setError(err.message);
    }
  }, [sessionId]);

  useEffect(() => {
    handleRefresh(); // Fetch data once when the page loads
  }, [handleRefresh]);

  const handleCalculate = async () => {
    try {
      const results = await calculateResults(sessionId);
      navigate(`/results/${sessionId}`, { state: { results: results } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="py-5 min-vh-100 bg-light">
      <Container>
        <h2 className="pt-5 mb-3 fw-bold text-center">Session Lobby</h2>
        <p className="text-center text-muted mb-4">Share this code with your friends!</p>
        <Row className="justify-content-center mb-4"><Col xs="auto"><Card className="p-3 shadow-sm"><Card.Title className="m-0" style={{ fontSize: '2.5rem', letterSpacing: '4px' }}>{sessionId}</Card.Title></Card></Col></Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="m-0">Joined Members:</h4>
              <Button variant="outline-secondary" size="sm" onClick={handleRefresh}>Refresh List</Button>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {sessionData ? (
              <ListGroup className="shadow-sm">
                {sessionData.participants.map((p, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center"><strong>{p.name}</strong><span className="text-muted">{p.address}</span></ListGroup.Item>
                ))}
              </ListGroup>
            ) : <Spinner animation="border" />}
          </Col>
        </Row>
        <Row className="justify-content-center mt-4"><Col xs={12} md={8} lg={6} className="d-grid"><Button variant="success" size="lg" onClick={handleCalculate}>Find Meetup Spots!</Button></Col></Row>
      </Container>
    </div>
  );
}

export default SessionLobby;