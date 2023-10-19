import * as actions from '../actionTypes';


const initialState={
    user:{},
    loggedin: false
};

export default function auth(state = initialState, action){
    switch(action.type){
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                user:action.payload.user,
                loggedin:true
            };
        case actions.AUTH_DESTROY:
            return {
                ...state,
                user:{},
                loggedin:false
            };
        default:
            return state;
    }
}