import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import examReducer from "./examReducer";
import socketReducer from "./socketReducer";
import studentReducer from "./studentReducer";
import ticketReducer from "./ticketReducer";

const reducers = combineReducers({
  auth: authReducer,
  course: courseReducer,
  student: studentReducer,
  exam: examReducer,
  socket: socketReducer,
  ticket: ticketReducer,
});

export default reducers;
