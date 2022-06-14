import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import '../styles/Navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";  


/*
  The following class represents the Navigation Tab that is present throughout the User Interface
 */
class Navigation extends React.Component {
    
  render() {
    return(
        <Navbar fixed="top" expand="md" collapseOnSelect> 
        {/* expand="md"  */}
            <Container>
                <Navbar.Brand className="p-0" href='/'>
                  <img src="/Logo-removebg-preview.png" className="logo" alt="logo"></img>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ml-auto" as="ul">
                    <Nav.Item as="li">
                        <Nav.Link href='/'>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href='/'>Information</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href='/'>Contacts</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
  }
}

export default Navigation;