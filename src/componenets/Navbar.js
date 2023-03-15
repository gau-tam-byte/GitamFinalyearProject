import React from 'react'
import {  Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import logo from '../images/images.jpg'
const Navbarr = () => {
  return (
   <>
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand ><Link className="text-decoration-none text-white" to="/Home">Online Services</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link ><Link className="text-decoration-none text-white" to="/Home">About Project</Link></Nav.Link>
            <Nav.Link ><Link className="text-decoration-none text-white" to="/AboutUs">Profile</Link></Nav.Link>

            <Nav.Link ><Link className="text-decoration-none text-white" to="/Reqser">Service Request</Link></Nav.Link>
            
          </Nav>
          <Nav>
            <Nav.Link ><Link className="text-decoration-none text-white active" to="/Login">Login</Link></Nav.Link>
            <NavDropdown title="Registration" id="collasible-nav-dropdown">
              <NavDropdown.Item ><Link className="text-decoration-none text-black" to="/Register">User Register</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
              <Link className="text-decoration-none text-black" to="#">Agent Register</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link ><Link className="text-decoration-none text-white" to="/Logout">Logout</Link></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
   </>
  )
}

export default Navbarr
