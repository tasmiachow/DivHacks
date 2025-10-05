import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';

function ResultsPage() {
    const location = useLocation();
    const results = location.state?.results;
    if (!results || results.length === 0) {
        return <div className="py-5 min-vh-100 bg-light"><Container><Alert variant="warning" className="mt-5">No results found.</Alert></Container></div>;
    }
    const topSpot = results[0];
    return (
        <div className="py-5 min-vh-100 bg-light">
            <Container>
                <h2 className="pt-5 mb-3 fw-bold text-center">Your Top 3 Meetup Spots!</h2>
                <Alert variant="success" className="text-center"><strong>Top Recommendation: {topSpot.name}</strong></Alert>
                <Row className="g-4 mt-4">
                    {results.map((result, index) => (
                        <Col key={index} md={4}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title className="fw-bold">{index + 1}. {result.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{result.address}</Card.Subtitle>
                                    <hr />
                                    <Card.Text as="div">
                                        <strong>Travel Times:</strong>
                                        <ul className="list-unstyled mt-2">
                                            {result.travelInfo.map((info, i) => (<li key={i}><strong>{info.participantName}:</strong> {info.durationText}</li>))}
                                        </ul>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
export default ResultsPage;