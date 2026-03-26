import { ReducerData } from "./Components/Services/Reducer/Reducer";
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const Store = createStore(
    ReducerData, composeEnhancers(applyMiddleware(thunk)))
export default Store;
