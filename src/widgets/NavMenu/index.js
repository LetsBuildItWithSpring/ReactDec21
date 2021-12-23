
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import * as fx from './../../fx';
const NavMenu = () => {
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    return <Navbar bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand>
                Blog Lite
            </Navbar.Brand>
            <Navbar.Collapse>
                <Nav className="me-auto">
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
                {token && <Nav>
                    <Nav.Link onClick={() => {
                        dispatch(fx.logout());
                    }}> Logout </Nav.Link>
                </Nav>}
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavMenu;