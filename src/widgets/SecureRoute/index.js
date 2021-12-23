


import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'
import LandingPage from './../../Pages/LandingPage';

// Authentication Guard
const SecureRoute = (props) => {
    const { path, component: Component } = props;
    const [token, setToken] = useState('');
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("USER UPDATED", user);
        // if(token){
        //     return;
        // }
        if (user && user.token) {
            setToken(user.token);
        } else {
            const user_token = sessionStorage.getItem('user_token');
            
            if (typeof user_token === 'string') {
                setToken(user_token);
                dispatch({type: 'SET_TOKEN', data: user_token});
            }
            else {
                setToken('');
            }
        }
    }, [user]);

    useEffect(() => {
        console.log("Token changed");
    }, [token]);

    return <Route path={path} render={(props) => {
        // const ex = {
        //     a:10,
        //     b: 'cool',
        //     c: [1,23],
        //     d: {a:1}
        // };
        return <>
            {token ? <Component /> : <LandingPage {...props} />}
        </>
    }} />
}

export default SecureRoute;