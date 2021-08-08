import { ActionType } from "../actions/types";
import { Action } from "./types";

const initialState = {
  socket: null,
  connected: false
};

export default function socketReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.SOCKET_CONNECT:
      return { ...state, socket: action.payload.socket, connected: true };
    default:
      return state;
  }
}
