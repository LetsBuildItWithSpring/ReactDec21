export const userReducer = (state={}, action) => {

    if(action.type === 'SET_TOKEN'){
        return {...state, token: action.data};
    }
    return state;
}
