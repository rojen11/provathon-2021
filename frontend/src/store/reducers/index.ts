import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import examReducer from "./examReducer";
import studentReducer from "./studentReducer";

const reducers = combineReducers({
  auth: authReducer,
  course: courseReducer,
  student: studentReducer,
  exam: examReducer,
});

export default reducers;
