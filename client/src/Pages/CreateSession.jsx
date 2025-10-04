import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CreateSession() {
    return (
        <div className="py-5 bg-light min-vh-100">
            <Container>
                <h2 className="text-center mb-4">What would you like to do?</h2>
                <Row className="g-4 justify-content-center">
                    <Col xs={12} md={6} lg={5}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column align-items-center text-center">
                                <Card.Text>Enter a code to join your group.</Card.Text>
                                <Button as={Link} to="/join" variant="primary" size="lg" className="mt-auto">
                                    Join
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={5}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column align-items-center text-center">
                                <Card.Text>Create a new session and share the code.</Card.Text>
                                <Button as={Link} to="/start" variant="dark" size="lg" className="mt-auto">
                                    Start
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateSession;
