import { api } from "../../api";
import { Exam } from "../reducers/examReducer";
import { ActionType } from "./types";

export const createExam = (exam: Exam) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.EXAM_LOADING });
    api({
      query: `
            mutation ($name: String!, $courseId: ID, $startTime: DateTime, $endTime: DateTime, $submitDuration: Int, $totalMarks: Int){
                createExam(
                name: $name,
                courseId: $courseId,
                startTime: $startTime,
                endTime: $endTime,
                submitDuration: $submitDuration,
                totalMarks: $totalMarks) {
                    exam {
                        id
                        name
                        startTime
                        endTime
                        submitDuration
                        totalMarks
                        completed
                    }
                }
            }
        `,
      variables: exam,
    }).then((res) => console.log(res));
  };
};

export const closePopup = () => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.EXAM_CLOSE_POPUP });
  };
};
