import { ActionType } from "../actions/types";
import { Action } from "./types";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export default function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state, isLoading: true };

    case ActionType.LOADED:
      return { ...state, isLoading: false };

    case ActionType.USER_LOADED:
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };

    case ActionType.LOGIN_FAIL:
      return { ...state, isAuthenticated: false, isLoading: false };

    default:
      return state;
  }
}
