import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";

const reducers = combineReducers({
  auth: authReducer,
  course: courseReducer,
});

export default reducers;
