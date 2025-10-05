import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CreateSession() {
    const bgStyle = {
        background: "linear-gradient(135deg, #e8f0fe 0%, #c8f7e2 60%, #ffffff 100%)",
        minHeight: "100vh",
        padding: "4rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const cardStyle = {
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    };

    return (
        <div style={bgStyle}>
            <Container>
                <h2 className="display-4 text-center mb-5 fw-bold">What would you like to do?</h2>
                <Row className="g-4 justify-content-center">
                    <Col xs={12} md={5}>
                        <Card style={cardStyle} className="p-4 text-center">
                            <Card.Text className="mb-4 text-muted lead">
                                Enter a code to join your group.
                            </Card.Text>
                            <Button as={Link} to="/join" size="lg" variant="primary">
                                Join
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={12} md={5}>
                        <Card style={cardStyle} className="p-4 text-center">
                            <Card.Text className="mb-4 text-muted lead">
                                Create a new session and share the code.
                            </Card.Text>
                            <Button as={Link} to="/start" size="lg" style={{ backgroundColor: "#1a73e8", border: "none" }}>
                                Start
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateSession;
