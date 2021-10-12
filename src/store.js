import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axiosMiddleware from 'redux-axios-middleware';
import client from './axiosConfig';
import reducers from "./reducers";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, axiosMiddleware(client))));

export default store;