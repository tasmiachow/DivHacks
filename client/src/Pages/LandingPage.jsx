import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LandingPage() {
    const heroStyle = {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #e8f0fe 0%, #c8f7e2 60%, #ffffff 100%)",
        color: "#202124",
    };

    const btnStyle = {
        backgroundColor: "#1a73e8",
        border: "none",
        borderRadius: "10px",
        fontWeight: 600,
        padding: "0.75rem 1.5rem",
    };

    return (
        <div style={heroStyle}>
            <Container>
                <h1 className="fw-bold display-4 mb-3">LinkUP NYC</h1>
                <p className="lead">FInd the best spots to meetup with your friends.</p>
                <Button as={Link} to="/create-session" size="lg" style={btnStyle}>
                    Get Started
                </Button>
            </Container>
        </div>
    );
}

export default LandingPage;
