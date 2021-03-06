import { ActionType } from "../actions/types";
import { Action } from "./types";

export type Exam = {
  id?: number;
  startTime: string;
  endTime: string;
  name: string;
  submitDuration: number;
  totalMarks: number;
  courseId: number;
};

type StateType = {
  isLoading: boolean;
  showPopup: boolean;
  exams: Exam[];
};

const initialState: StateType = {
  isLoading: false,
  showPopup: false,
  exams: [],
};

export default function examReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.EXAM_LOADING:
      return { ...state, isLoading: true, showPopup: true };

    case ActionType.EXAM_CLOSE_POPUP:
      return { ...state, showPopup: false };

    case ActionType.EXAM_CREATE:
      return { ...state, isLoading: false };

    case ActionType.EXAM_LOAD:
      if (action.payload.exams === undefined || action.payload.exams === null) {
        return { ...state, exams: [], isLoading: false, showPopup: false };
      }
      return {
        ...state,
        exams: [...action.payload.exams],
        isLoading: false,
        showPopup: false,
      };

    default:
      return state;
  }
}
