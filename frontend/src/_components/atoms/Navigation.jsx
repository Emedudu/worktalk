import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { IoLogOutOutline } from "react-icons/io5";
import { IsSignedInContext, SideBarContext } from "../../App";

const Navigation = () => {
  const [sideBar, setSideBar] = useContext(SideBarContext);
  const [isSignedIn, setIsSignedIn] = useContext(IsSignedInContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsSignedIn("isSignedIn", "false");
    navigate("/");
  };
  return (
    <Navbar bg="light" expand={"sm"} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              WorkTalk
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {isSignedIn === "true" ? (
                <>
                  <Nav.Link className="px-2" as={Link} to="/messages">
                    <TiMessages size="40" />
                  </Nav.Link>
                  <Nav.Link className="px-2" onClick={signOut}>
                    <IoLogOutOutline size="40" />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="px-2" as={Link} to="/register">
                    Sign Up
                  </Nav.Link>
                  <Nav.Link className="px-2" as={Link} to="/">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
export default Navigation;
