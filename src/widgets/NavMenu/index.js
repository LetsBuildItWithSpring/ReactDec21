
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
const NavMenu = () => <Navbar bg="light" expand="lg">
    <Container fluid>
        <Navbar.Brand>
            Blog Lite
        </Navbar.Brand>
        <Navbar.Collapse>
            <Nav>
                <Nav.Link>
                    <NavLink exact activeClassName="active-link" to="/">
                        Home
                    </NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink activeClassName="active-link" to="/tweets">
                        Tweets
                    </NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink activeClassName="active-link" to="/myaccount">
                        My Account
                    </NavLink>
                </Nav.Link>

            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>

export default NavMenu;