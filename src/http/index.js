import axios from 'axios';


const BASE_URL = 'http://localhost:6789';

export const createCat = async (category='') => {
    try {
        const res = await axios.post(`${BASE_URL}/category/new`, {
            category,
        });
        return res.data;
    }catch(err){
        console.log(err);
    }
}
export const createTweet = async (tweet = {}) => {
    try {
        const res = await axios.post(`${BASE_URL}/tweet/new`, tweet);
        return res;
    }catch(err){
        console.log(err);
    }
}

export const getTweets = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/tweet/all`);
        console.log("GET_TWEETS",res);
        return res.data;
    }catch(err){
        console.log(err);
    }
}
export const getCats = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/category/all`);
        console.log("GET_CATS",res);
        return res.data;
    }catch(err){
        console.log("GET_CATS_ERR",);

        console.log(err);
    }
}

export const createUser = async (user) => {
    try{
        const {data} = await axios.post(`${BASE_URL}/user/new`, user);
        return data;
    }catch(err){
        console.log(err);
    }
}
export const logUserIn = async (user) => {
    try{
        const {data} = await axios.post(`${BASE_URL}/user/login`, user);
        console.log("DATA", data);
        return data;
    }catch(err){
        console.log(err);
    }
}