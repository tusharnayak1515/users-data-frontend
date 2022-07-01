import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    dataReducer: dataReducer
});

export default rootReducer;