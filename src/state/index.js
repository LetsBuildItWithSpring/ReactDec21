import { createStore, combineReducers, applyMiddleware } from 'redux';
import uid2 from 'uid2';

function xyz(state=0, action){
    console.log("ACTION IN REDUCER");
    console.log(action);
    if(action.type === 'deposit'){
        state = state + action.payload;
    }
    if(action.type === 'withdraw'){
        state = state - action.payload;
    }
    return state;
}

function tweetsReducer(state = [], action) {
    console.log(action, "From TWEETS REDUCER")
    const {type, data}  = action;

    if(type === 'ADD_TWEET'){
        const tweet = {
            id: uid2(5),
            ...data,
        }
        state = [tweet, ...state];
    }
    if(type === 'REMOVE_TWEET'){
        state = state.filter((tweet) => {
            return tweet.id != data
        })
    }
    return state;
}

function categoryReducer(state=[], action){
    if(action.type === 'ADD_CATEGORY'){
        state = [action.data, ...state];
    }
    return state;
}

const rootReducer =  combineReducers({
    balance: xyz,
    tweets: tweetsReducer,
    categories: categoryReducer,
});

const customMiddleware = (store) => {
    return (next) => {
        return (action) => {
                console.log("Hi From middleware", action);
                if(typeof action === 'function'){
                    action(store);
                } else {
                    next(action);
                }
        }
    }
}


const store = createStore(rootReducer, applyMiddleware(
       ...[ customMiddleware,
        (state) => (next) => (action) => {
            console.log("Hi from 2nd middleware", action);
            next(action)
        },
        (state) => (next) => (action) => {
            console.log("Hi from 3nd middleware", action);
            next(action);
        },]
    ));

export default store;

