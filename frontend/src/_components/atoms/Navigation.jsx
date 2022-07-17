import React, { useContext, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { IoLogOutOutline } from "react-icons/io5";
import { IsSignedInContext, SideBarContext } from "../../App";

const Navigation=()=>{
    const [sideBar,setSideBar]=useContext(SideBarContext)
    const [isSignedIn,setIsSignedIn]=useContext(IsSignedInContext)
    const navigate=useNavigate()
    const [expanded, setExpanded] = useState(false);
    const signOut=()=>{
      localStorage.removeItem('token')
      setIsSignedIn(false)
      navigate('/')
    }
    return(
        <Navbar expanded={expanded} collapseOnSelect expand="lg" variant="light" sticky='top'>
          <Container className="ml-auto">
            <Navbar.Brand className="cursor-pointer" onClick={()=>setSideBar(!sideBar)}>Owner'sPic</Navbar.Brand>
            {isSignedIn?(
              <Nav className='flex-row'>
                <Nav.Link className='px-2' as={Link} to='/messages'><TiMessages size='40'/></Nav.Link>
                <Nav.Link className='px-2' onClick={signOut}><IoLogOutOutline size='40'/></Nav.Link>
              </Nav>
            ):(
              <Nav className='flex-row'>
                <Nav.Link className='px-2' as={Link} to='/register'>Sign Up</Nav.Link>
                <Nav.Link className='px-2' as={Link} to='/'>Login</Nav.Link>
              </Nav>
            )

            }
          </Container>
        </Navbar>
    )

}
export default Navigation;