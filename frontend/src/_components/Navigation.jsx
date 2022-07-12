import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation=({sideBar,setSideBar})=>{
    const [expanded, setExpanded] = useState(false);
    return(
        <Navbar expanded={expanded} collapseOnSelect expand="lg" variant="light" sticky='top'>
          <Container className="ml-auto">
            <Navbar.Brand onClick={()=>setSideBar(!sideBar)}>Owner'sPic</Navbar.Brand>
            <Nav.Link as={Link} to='/messages'>messages</Nav.Link>
          </Container>
        </Navbar>
    )

}
export default Navigation;