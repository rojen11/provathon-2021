import * as ActionType from "./actionTypes";

const initState = {
  exams: [],
};

const examReducer = (state = initState, action) => {
  let modifyState = { ...state };
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionType.LOAD_EXAMS:
      modifyState.exams = [...action.exams];
      return modifyState;
    case ActionType.ADD_EXAM:
      modifyState.exams.push(action.exam);
      return modifyState;
  }
  return state;
};

export default examReducer;
