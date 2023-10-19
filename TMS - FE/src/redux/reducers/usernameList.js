import * as actions from '../actionTypes';

const initialState={
    usernames: {
        roleToBeSetUsername: [[]],
        allStudentUsername: [[]],
        allAccountUsername: [[]]
    },
    isChanged: false
};

export default function usernameList(state = initialState, action){
    switch(action.type){
        case actions.EDIT_S:
            return {
                ...state,
                usernames:action.payload.usernames,
                isChanged: true
            };
        case actions.STOP_C:
            return {
                ...state,
                usernames:action.payload.usernames,
                isChanged: false
                };
        default:
            return state;
    }
}