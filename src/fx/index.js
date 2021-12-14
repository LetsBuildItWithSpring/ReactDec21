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
        const cats = sessionStorage.getItem('categories');
        const tweets = sessionStorage.getItem('tweets');
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