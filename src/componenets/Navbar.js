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
       <Navbar collapseOnSelect expand="lg" bg="secondary" variant="light" className='rounded mt-2 mr-2 ml-2 mb-2'>
        <Container>
        <Navbar.Brand ><Link className="text-decoration-none text-white pl-2" to="/">Online Services</Link></Navbar.Brand>
        <Navbar.Toggle aria-expanded="false" aria-controls="responsive-navbar-nav" className='navbar-toggler mr-2'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link ><Link className="text-decoration-none text-white" to="/Home">About Project</Link></Nav.Link> */}
            <Nav.Link ><Link className="text-decoration-none text-white" to="/AboutMe">Profile</Link></Nav.Link>

            <Nav.Link ><Link className="text-decoration-none text-white" to="/Reqser">Request Service</Link></Nav.Link>
            {/* <Nav.Link ><Link className="text-decoration-none text-white" to="/Serreqs">Requested Services</Link></Nav.Link> */}

            
          </Nav>
          <Nav>
            <NavDropdown title={ <span className="text-danger">Login's</span> }  id="collasible-nav-dropdown">
              <NavDropdown.Item><Link className="text-decoration-none text-black " to="/Login">User Login</Link></NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item><Link className="text-decoration-none text-black" to="/AgentLogin">Agent Login</Link></NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link ></Nav.Link> */}
            <NavDropdown title={ <span className="text-warning">Registration's</span> }  id="collasible-nav-dropdown">
              <NavDropdown.Item><Link className="text-decoration-none text-black " to="/Register">User Register</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
              <Link className="text-decoration-none text-black" to="/AgentRegister">Agent Register</Link>
              </NavDropdown.Item>
              {/* <NavDropdown.Item >
              </NavDropdown.Item> */}
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
