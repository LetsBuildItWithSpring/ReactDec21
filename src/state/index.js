import { createStore, combineReducers } from 'redux';
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
    if(action.type === 'ADD_TWEET'){
        const tweet = {
            id: uid2(5),
            ...action.data,
        }
        state = [tweet, ...state];
    }
    if(action.type === 'REMOVE_TWEET'){
        state = state.filter((tweet) => {
            return tweet.id != action.data
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

const store = createStore(rootReducer);

export default store;

