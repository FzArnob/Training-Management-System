import { combineReducers, createStore } from "redux";
import auth from "./reducers/auth";
import usernameList from "./reducers/usernameList";

const rootReducer = combineReducers({
    auth,
    usernameList
  })
const store =createStore(rootReducer);

export default store;