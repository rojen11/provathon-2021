import { ActionType } from "../actions/types";
import { Action } from "./types";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
};

type StateType = {
  students: Student[];
  isLoading: boolean;
};

const initialState: StateType = {
  students: [],
  isLoading: false,
};

export default function studentReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.STUDENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ActionType.STUDENT_LOAD:
      if (!action.payload.students) {
        return {
          ...state,
          isLoading: false,
          students: [],
        };
      }
      return {
        ...state,
        isLoading: false,
        students: [action.payload.students],
      };
    default:
      return state;
  }
}
