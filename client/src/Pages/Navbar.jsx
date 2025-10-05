import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";


function NavigationBar() {
    const glassStyle = {
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    };
    return (
        <Navbar expand="lg" fixed="top" style={glassStyle} className="px-4 py-3">
            <Container fluid className="px-0">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-dark">
                    <img
                        src={logo}
                        alt="LinkUP logo"
                        style={{
                            height: "40px",
                            width: "40px",
                            objectFit: "contain",
                        }}
                    />
                    LinkUP
                </Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/" className="fw-medium text-dark mx-2">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/create-session" className="fw-medium text-dark mx-2">
                            Get Started
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
