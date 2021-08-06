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

const initialState = {
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
    default:
      return state;
  }
}
