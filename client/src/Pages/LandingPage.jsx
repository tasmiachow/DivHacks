import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="landing-page d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light">
            <Container>
                <h1 className="display-4 mb-4 fw-bold">Welcome to LinkUP NYC</h1>
                <Button as={Link} to="/create-session" variant="primary" size="lg">
                    Get Started
                </Button>
            </Container>
        </div>
    );
}

export default LandingPage;
