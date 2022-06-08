import React from 'react'
// import { NavLink } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import '../styles/Navigation.css';


/*
  The following class represents the Navigation Tab that is present throughout the User Interface
 */
class Navigation extends React.Component {
    
  render() {
    return(
        <Navbar fixed="top" className={"navbar-dark"} expand="md" collapseOnSelect>
            <Container>
                <Navbar.Brand className="p-0">
                  {/* This Logo is not present yet but for future development a Logo will be added */}
                    <div className={"logo-dark"}></div>
                </Navbar.Brand>
                <Navbar.Collapse id="main-navbar" >
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