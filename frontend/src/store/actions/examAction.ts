import { api } from "../../api";
import { Exam } from "../reducers/examReducer";
import { ActionType } from "./types";
import { RootState } from "..";

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
                    success
                }
            }
        `,
      variables: exam,
    }).then((res) => {
      const data = res.data.data.createExam;
      if (
        data.exam !== undefined &&
        data.exam !== null &&
        data.success === true
      ) {
        dispatch({ type: ActionType.EXAM_CREATE });
      }
    });
  };
};

// Close popup in create exam
export const closePopup = () => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.EXAM_CLOSE_POPUP });
  };
};

// load all exams for a course
export const loadExams = (courseID: string) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.EXAM_LOADING });
    api({
      query: `
          query ($id: ID) {
            examsByCourse (id: $id) {
              id
              name
              startTime
              endTime
              submitDuration
              completed
              course {
                id
                name
                primaryTeacher {
                  firstName
                  lastName
                }
              }
            }
          }
    `,
      variables: { id: courseID },
    }).then((res) => {
      const data = res.data.data.examsByCourse;

      if (data !== null) {
        dispatch({ type: ActionType.EXAM_LOAD, payload: { exams: [...data] } });
      }
    });
  };
};

export const startExam = (examId: string) => {
  return (dispatch: Function, getState: () => RootState) => {
    const { socket } = getState().socket;

    const exam = getState().exam.exams.find((exam) => exam.id === examId);

    if (exam === undefined) {
      return;
    }

    socket.emit(
      "exam-started",
      exam.id,
      getState().auth.user.id,
      getState().auth.user.isTeacher,
      exam.startTime,
      exam.endTime
    );
  };
};
