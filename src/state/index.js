import { createStore, combineReducers, applyMiddleware } from 'redux';
import uid2 from 'uid2';
import { userReducer } from './user.reducer';
//bastohomle@yevme.com
//DontShare

function xyz(state = 0, action) {
    console.log("ACTION IN REDUCER");
    console.log(action);
    if (action.type === 'deposit') {
        state = state + action.payload;
    }
    if (action.type === 'withdraw') {
        state = state - action.payload;
    }
    return state;
}

function tweetsReducer(state = [], action) {
    console.log(action, "From TWEETS REDUCER")
    const { type, data } = action;

    if (type === 'ADD_TWEET') {
        const tweet = {
            id: uid2(5),
            ...data,
        }
        state = [tweet, ...state];
    }
    if (type === 'REMOVE_TWEET') {
        state = state.filter((tweet) => {
            return tweet.id != data
        })
    }
    if (type === 'PUT_TWEETS') {
        let tempData;
        if(data === undefined || data === null){
            tempData = [];
        }else{
            tempData = data;
        }
        state = [...data]
    }
    return state;
}

function categoryReducer(state = [], action) {
    if (action.type === 'ADD_CATEGORY') {
        state = [action.data, ...state];
    }
    if (action.type === 'PUT_CATS') {
        state = [...action.data,];
    }
    return state;
}

function requestReducer(state = {
    loading: false,
    success: false,
    failure: false,
}, action) {
    const tempState = { ...state };
    if (action.type === 'LOADING') {
        tempState.loading = true;
        tempState.success = false;
        tempState.failure = false;
    }
    if (action.type === 'SUCCESS') {
        tempState.loading = false;
        tempState.success = true;
        tempState.failure = false;
    }
    if (action.type === 'FAILURE') {
        tempState.loading = false;
        tempState.success = false;
        tempState.failure = true;
    }
    if (action.type === 'RESET') {
        tempState.loading = false;
        tempState.success = false;
        tempState.failure = false;
    }
    return tempState;
}

const rootReducer = combineReducers({
    balance: xyz,
    tweets: tweetsReducer,
    categories: categoryReducer,
    httpReq: requestReducer,
    user: userReducer,
});

const customMiddleware = (store) => {
    return (next) => {
        return (action) => {
            console.log("Hi From middleware", action);
            if (typeof action === 'function') {
                action(store);
            } else {
                next(action);
            }
        }
    }
}


const store = createStore(rootReducer, applyMiddleware(
    ...[customMiddleware,
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

