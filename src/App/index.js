import React from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import MyAccount from '../Pages/MyAccount'
import Tweets from '../Pages/Tweets'
import './App.css';


const App = () => {
    return <Router>
        <ul>
            <li>
                <NavLink exact activeClassName="active-link" to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active-link" to="/tweets">
                    Tweets
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active-link" to="/myaccount">
                    My Account
                </NavLink>
            </li>
        </ul>
        <Route exact path="/" component={Home}/>
        <Route path="/tweets" component={Tweets}/>
        <Route path="/myaccount" component={MyAccount}/>
    </Router>
}

export default App;