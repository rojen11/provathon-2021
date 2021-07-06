import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import SocketReducer from "./Store/socketReudcer";
import AuthReducer from "./Store/authReducer";
import CourseReducer from "./Store/courseReducer";
import ExamReducer from "./Store/examReducer";
import TicketReducer from "./Store/ticketReducer";

export const store = createStore(
  combineReducers({
    SocketReducer,
    AuthReducer,
    CourseReducer,
    ExamReducer,
    TicketReducer,
  })
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
