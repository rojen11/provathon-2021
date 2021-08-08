import { ActionType } from "../actions/types";
import { Action } from "./types";

export type Course = {
  id: string;
  name: string;
  code: string;
  examSet?: any[];
  primaryTeacher?: {id:string, firstName:string, lastName:string};

};

type StateType = {
  courses: Course[];
  isLoading: boolean;
  active: Course | null;
};

const initialState: StateType = {
  courses: [],
  isLoading: false,
  active: null,
};

export default function courseReducer(
  state = initialState,
  action: Action
): StateType {
  switch (action.type) {
    case ActionType.COURSE_LOADING:
      return { ...state, isLoading: true };

    case ActionType.COURSE_LOAD:
      return { ...state, isLoading: false, courses: action.payload.courses };

    case ActionType.COURSE_ADD:
      return {
        ...state,
        isLoading: false,
        courses: [...state.courses, action.payload.course],
      };

    case ActionType.COURSE_REMOVE:
      const courses_new = state.courses.filter(
        (c: Course) => c.id !== action.payload.id
      );
      return { ...state, isLoading: false, courses: courses_new };

    case ActionType.COURSE_SELECT:
      const course = state.courses.find(
        (c: Course) => c.id === action.payload.id
      );

      if (course === undefined) {
        return { ...state, active: null };
      }

      return { ...state, active: { ...course } };


    case ActionType.COURSE_JOIN:
      return {
        ...state, isLoading: false, courses: [...state.courses, action.payload.course]
      }

    default:
      return state;
  }
}
