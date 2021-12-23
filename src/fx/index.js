import { useState } from 'react';
import * as http from './../http';


export const newTweet = (tweet) => {
    return async (store) => {
        try {
            store.dispatch({
                type: 'LOADING'
            });
            const data = await http.createTweet(tweet);
            const action = {
                type: 'ADD_TWEET',
                data,
            }
            store.dispatch({
                type: 'SUCCESS'
            });
            store.dispatch(action);
        } catch (error) {
            store.dispatch({
                type: 'FAILURE'
            });
        }
    }
}
export const newCategory = (category) => {
    return async (store) => {
        try {
            store.dispatch({
                type: 'LOADING'
            });
            const data = await http.createCat(category);
            console.log(data);
            const action = {
                type: 'ADD_CATEGORY',
                data,
            };
            store.dispatch({
                type: 'SUCCESS'
            });
            store.dispatch(action);
        } catch (error) {
            store.dispatch({
                type: 'FAILURE'
            });
        }
    }
}


export const getData = () => {
    return (store) => {
        let cats = '';
        let tweets = '';
        try{
             cats = sessionStorage.getItem('categories');
             tweets = sessionStorage.getItem('tweets');
           
        }catch(err){
            console.log(err);
        }
        if (cats) {
            const data = JSON.parse(cats);
            store.dispatch({
                type: 'PUT_CATS',
                data,
            });
        } else {
            http.getCats()
                .then(data => {
                    sessionStorage.setItem('categories', JSON.stringify(data))
                    store.dispatch({
                        type: 'PUT_CATS',
                        data,
                    });
                });
        }
        if (tweets) {
            const data = JSON.parse(tweets);
            store.dispatch({
                type: 'PUT_TWEETS',
                data,
            });
        } else {
            http.getTweets()
                .then(data => {
                    sessionStorage.setItem('tweets', JSON.stringify(data))
                    store.dispatch({
                        type: 'PUT_TWEETS',
                        data,
                    });
                });
        }
    }
}

export const newUser = (user) => {
    return async (store) => {
        const {result} = await http.createUser(user);
        console.log(result);
        if(result._id){
            store.dispatch({
                type: "SUCCESS"
            });
        } else{
            store.dispatch({
                type: "FAILURE"
            });
        }
    }
}

export const signUserIn = (user) => {
    return async (store) => {
        const {token} = await http.logUserIn(user);
        console.log("token log in fx", token);
        // const token = data.token;
        if(token){
            sessionStorage.setItem("user_token", token);
            store.dispatch({
                type: 'SUCCESS'
            });
            store.dispatch({
                type: 'SET_TOKEN',
                data: token
            });
        } else {
            store.dispatch({
                type: 'FAILURE'
            });
        }
    }
}

export const logout = () => {
 return  (store) => {
            sessionStorage.removeItem('user_token');
            store.dispatch({
                type: 'SET_TOKEN',
                data:'',
            });
    }
}