import React from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Home from '../Pages/Home'
import MyAccount from '../Pages/MyAccount'
import Tweets from '../Pages/Tweets'
import './App.css';
import NavMenu from '../widgets/NavMenu';


const App = () => {
    return <Container fluid>
        <Router>
            <NavMenu/>
            <Route exact path="/" component={Home} />
            <Route path="/tweets" component={Tweets} />
            <Route path="/myaccount" component={MyAccount} />
        </Router>
    </Container>
}

export default App;