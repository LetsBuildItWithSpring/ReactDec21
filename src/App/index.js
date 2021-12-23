import React from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Home from '../Pages/Home'
import MyAccount from '../Pages/MyAccount'
import Tweets from '../Pages/Tweets';
import LandingPage from '../Pages/LandingPage';
import './App.css';
import NavMenu from '../widgets/NavMenu';
import SecureRoute from '../widgets/SecureRoute';
import ErrorBoundary from '../widgets/ErrorBoundary';


const App = () => {
    return <Container fluid>
        <Router>
            <NavMenu/>
            {/* <Route exact path="/" component={LandingPage} /> */}
            <Route exact path="/" render={() => {
                return <ErrorBoundary>
                    <Home/>
                </ErrorBoundary>
            }} />
            <Route exact path="/sign" component={LandingPage} />
            {/* <Route path="/tweets" component={Tweets} /> */}
            <SecureRoute path="/tweets" component={Tweets}  />
            {/* <Route path="/myaccount" component={MyAccount} /> */}
            <SecureRoute path="/myaccount" component={MyAccount} />
        </Router>
    </Container>
}

export default App;