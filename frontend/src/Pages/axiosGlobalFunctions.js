import AxiosFunction from "../Store/axiosFunction";
import { store } from "../index";
import * as ActionType from "../Store/actionTypes";

export function onLoadExams(course) {
  AxiosFunction(`query {
    examsByCourse (id: ${course}) {
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
  }`).then((res) => {
    const data = res.data.data.examsByCourse;
    store.dispatch({ type: ActionType.LOAD_EXAMS, exams: data });
  });
}

export function onLoadStudents(course) {
  AxiosFunction(`query {
    studentByCourse (courseId: ${course}) {
        id
        firstName
        lastName
        email
    }
}`).then((res) => {
    const data = res.data.data.studentByCourse;
    store.dispatch({ type: ActionType.LOAD_STUDENTS, students: data });
  });
}
