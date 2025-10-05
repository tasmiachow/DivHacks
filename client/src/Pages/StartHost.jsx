import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

function HostForm() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [option, setOption] = useState("cafe");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nCode: ${code}\nLocation: ${location}\nOption: ${option}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e8f0fe 0%, #c8f7e2 60%, #ffffff 100%)",
      }}
    >
      <Container>
        <Card
          className="shadow-lg p-4 mx-auto"
          style={{ maxWidth: "600px", borderRadius: "20px" }}
        >
          <h2 className="fw-bold text-center mb-4">Host a Meetup 🚀</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formCode">
                  <Form.Control
                    type="text"
                    placeholder="🔑 Party Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Control
                    type="text"
                    placeholder="👤 Host Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Control
                type="text"
                placeholder="📍 Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-center gap-3 mb-4">
              <Button
                variant={option === "cafe" ? "primary" : "outline-primary"}
                onClick={() => setOption("cafe")}
                style={{ borderRadius: "12px", minWidth: "100px" }}
              >
                ☕ Cafe
              </Button>
              <Button
                variant={option === "restaurant" ? "primary" : "outline-primary"}
                onClick={() => setOption("restaurant")}
                style={{ borderRadius: "12px", minWidth: "100px" }}
              >
                🍳 Restaurant
              </Button>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                style={{
                  background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
                  border: "none",
                  borderRadius: "14px",
                  fontWeight: 600,
                  padding: "0.75rem 2rem",
                }}
              >
                Let’s LinkUp ✨
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default HostForm;
