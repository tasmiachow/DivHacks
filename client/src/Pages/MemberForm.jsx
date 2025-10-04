import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

function MemberForm() {
    const [form, setForm] = useState({
        code: "",
        name: "",
        location: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: later you can send data to backend or check code validity
        setSubmitted(true);
    };

    return (
        <div className="py-5 min-vh-100 bg-light">
            <Container>
                <h2 className="mb-4 text-center fw-bold">Join a Party</h2>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        {submitted && (
                            <Alert variant="success" className="mb-4">
                                Submitted! <br />
                            </Alert>
                        )}

                        <Form
                            onSubmit={handleSubmit}
                            className="shadow-sm p-4 rounded bg-white"
                        >
                            <Form.Group className="mb-3" controlId="formCode">
                                <Form.Label>Party Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="code"
                                    placeholder="Enter code"
                                    value={form.code}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    placeholder="City, Neighborhood, or Address"
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" size="lg" type="submit">
                                    Join Party
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MemberForm;
