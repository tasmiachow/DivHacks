import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { joinSession } from "../services/apiService";

function MemberForm() {
  const [form, setForm] = useState({ code: "", name: "", location: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await joinSession(form.code, form.name, form.location);
      navigate(`/session/${form.code}`); // Navigate to the lobby
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="py-5 min-vh-100 bg-light">
      <Container>
        <h2 className="pt-5 mb-4 text-center fw-bold">Join a Session</h2>
        <Row className="justify-content-center"><Col xs={12} md={8} lg={6}><Form onSubmit={handleSubmit} className="shadow-sm p-4 rounded bg-white">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3"><Form.Label>Session Code</Form.Label><Form.Control type="text" name="code" placeholder="Enter code" value={form.code} onChange={handleChange} required /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Your Name</Form.Label><Form.Control type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required /></Form.Group>
          <Form.Group className="mb-4"><Form.Label>Your Location</Form.Label><Form.Control type="text" name="location" placeholder="Enter your address" value={form.location} onChange={handleChange} required /></Form.Group>
          <div className="d-grid"><Button variant="primary" size="lg" type="submit">Join Session</Button></div>
        </Form></Col></Row>
      </Container>
    </div>
  );
}
export default MemberForm;