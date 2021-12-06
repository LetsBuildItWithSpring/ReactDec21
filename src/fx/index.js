import * as http from './../http';


export const newTweet = (tweet) => {
    return async (store) => {
        const data = await http.createTweet(tweet);
        const action = {
            type: 'ADD_TWEET',
            data,
        }
        store.dispatch(action);
    }
}