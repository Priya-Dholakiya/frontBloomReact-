import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import productReducer from "../Service/Reducer/ProductReducer/ProductReducer";
import AuthReducer from "../Service/Reducer/AuthReducer/AuthReducer";

const rootReducer = combineReducers({
  productReducer,
  AuthReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
