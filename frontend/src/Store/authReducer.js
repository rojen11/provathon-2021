import { mapColDefTypeToInputType } from "@material-ui/data-grid";
import * as ActionType from "./actionTypes";

const initState = {
  userID: "",
  firstName: "",
  lastName: "",
  isTeacher: true,
  accessToken: "",
};

const socketReducer = (state = initState, action) => {
  let modifyState = { ...state };
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionType.STORE_USER:
      modifyState.userID = action.user.id;
      modifyState.firstName = action.user.firstName;
      modifyState.lastName = action.user.lastName;
      modifyState.isTeacher = action.user.isTeacher;
      return modifyState;
    case ActionType.STORE_ACCESSTOKEN:
      modifyState.accessToken = action.token;
      return modifyState;
    case ActionType.SIGN_OUT:
      modifyState = { ...initState };
      return modifyState;
  }
  return state;
};

export default socketReducer;
