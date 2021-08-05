import * as ActionType from "./actionTypes";

import { sendLog } from "../Socket/events";

const initState = { message: "" };

const LogReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.SEND_LOG:
      sendLog(action.message);
      return state;
    default:
      return state;
  }
};

export default LogReducer;
