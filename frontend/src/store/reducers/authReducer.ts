import { ActionType } from "../actions/type";

type Action = {
  type: ActionType;
  payload?: any;
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export default function AuthReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.USER_LOADING:
      return { ...state, isLoading: true };

    case ActionType.USER_LOADED:
    case ActionType.LOGIN_SUCCESS:
      return {...state, isAuthenticated: true, isLoading: false, user: action.payload.user}

    case ActionType.LOGIN_FAIL:
      return {...state, isAuthenticated: false, isLoading: false}

    default:
      return state;
  }
}
