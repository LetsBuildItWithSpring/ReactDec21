

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notifier from '../../widgets/Notifier';
import * as fx from './../../fx';

const LandingPage = (props) => {
    const [mode, setMode] = useState("SIGNUP");
    const [user, setUser] = useState({ email: '', password: '' });
    const { success, failure } = useSelector(state => state.httpReq);
    const loggedUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleSignup = () => {
        dispatch(fx.newUser(user));
    }
    const handleSignIn = () => {
        dispatch(fx.signUserIn(user));
    }
    useEffect(() => {
        console.log(props);
        // if(loggedUser && loggedUser.token){
        //     props.history.push('/tweets');
        // }
    }, [loggedUser]);
    return <div>
        {
            mode === 'SIGNUP' ? <h2>Create your account</h2> : <h2>Login</h2>
        }
        <table>
            <tr>
                <td><input onChange={(ev) => {
                    const { currentTarget: { value } } = ev;
                    setUser({ ...user, email: value });
                }} type="text" /></td>
                <td><input onChange={(ev) => {
                    const { currentTarget: { value } } = ev;
                    setUser({ ...user, password: value });
                }} type="password" /></td>
                <td>
                    {
                        mode === 'SIGNUP' ?
                            <button onClick={handleSignup} className="btn btn-primary">Sign Up </button> :
                            <button onClick={handleSignIn} className="btn btn-primary">Sign In </button>
                    }
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td>
                    {
                        mode === 'SIGNUP' ?
                            <a onClick={() => {
                                setMode('LOGIN')
                            }} href="#">Already have any account? Please Sign in.</a> :
                            <a onClick={() => {
                                setMode('SIGNUP')
                            }} href="#">Don't have an account? Please Sign Up.</a>
                    }
                </td>
            </tr>
        </table>
        {success && <Notifier variant="success">
                    <p>User is created</p>
        </Notifier>}

        { mode != 'SIGNUP' && success && <Notifier variant="success">
                    <p>User is logged in.</p>
                </Notifier>
        }
        { mode != 'SIGNUP' && failure && <Notifier variant="danger">
                    <p>Signin failed. Please try again</p>
                </Notifier>
        }
    </div>
};
export default LandingPage;