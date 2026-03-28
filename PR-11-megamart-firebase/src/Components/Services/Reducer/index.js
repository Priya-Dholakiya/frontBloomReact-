import { combineReducers } from "redux";
import { ReducerData } from "./Reducer";
import { AuthReducer } from "./AuthenticationReducer";

export const rootReducer = combineReducers({
    ReducerData,
    AuthReducer
})