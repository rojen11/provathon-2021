import * as ActionType from "./actionTypes";

const initState = {
  courses: [],
  students: [],
};

const courseReducer = (state = initState, action) => {
  let modifyState = { ...state };
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionType.LOAD_COURSES:
      modifyState.courses = [...action.courses];
      return modifyState;
    case ActionType.ADD_COURSE:
      modifyState.courses.push(action.course);
      return modifyState;
    case ActionType.DELETE_COURSE:
      for (var i = 0; i < modifyState.courses.length; i++) {
        if (modifyState.courses[i].id === action.id) {
          modifyState.courses.splice(i, 1);
        }
      }
      return modifyState;
    case ActionType.LOAD_STUDENTS:
      modifyState.students = [...action.students];
      return modifyState;
  }
  return state;
};

export default courseReducer;
