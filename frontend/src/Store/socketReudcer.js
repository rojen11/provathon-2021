import * as ActionType from "../Store/actionTypes";

const initState = {
  socketConnection: undefined,
};

const socketReducer = (state = initState, action) => {
  let modifyState = { ...state };
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionType.SOCKET_STORE:
      modifyState.socketConnection = action.socket;
      return modifyState;
  }
  return state;
};

export default socketReducer;
