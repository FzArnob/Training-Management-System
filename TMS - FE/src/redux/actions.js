import * as actions from "./actionTypes";

export const authSuccess = (user) => {
    return {
        type: actions.AUTH_SUCCESS,
        payload:{
          user: user
        }
      }
}

export const authDestroy = () => {
    return {
        type: actions.AUTH_DESTROY
      }
}
export const editUsernameList = (usernames) => {
    return {
        type: actions.EDIT_S,
        payload:{
            usernames: usernames
        }
      }
}

export const resetChange = (usernames) => {
    return {
        type: actions.STOP_C,
        payload:{
            usernames: usernames
        }
      }
}