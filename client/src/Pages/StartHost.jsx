import React from "react";
import { Container, Alert } from "react-bootstrap";

function StartHost() {
    return (
        <div className="py-5 min-vh-100 bg-light">
            <Container>
                <h2 className="mb-3 fw-bold text-center">Start a Party</h2>
                <Alert variant="info" className="text-center">
                    Page for host to start a party - placeholder
                </Alert>
            </Container>
        </div>
    );
}

export default StartHost;
