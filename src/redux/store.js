import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import thunk from 'redux-thunk';
import { applyMiddleware } from "redux";

const store = configureStore({reducer: rootReducer}, {}, applyMiddleware(thunk));

export default store;