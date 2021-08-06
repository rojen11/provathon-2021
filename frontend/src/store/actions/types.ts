export enum ActionType {
  LOADING = "LOADING",
  LOADED = "LOADED",
  USER_LOADED = "USER_LOADED",
  AUTH_ERROR = "AUTH_ERROR",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  GET_ERRORS = "GET_ERRORS",
  CLEAR_ERRORS = "CLEAR_ERRORS",

  COURSE_LOAD = "COURSE_LOAD",
  COURSE_ADD = "COURSE_ADD",
  COURSE_REMOVE = "COURSE_REMOVE",
  COURSE_LOADING = "COURSE_LOADING",
  COURSE_SELECT = "COURSE_SELECT",

  STUDENT_LOAD = "STUDENT_LOAD",
  STUDENT_LOADING = "STUDENT_LOADING",

  EXAM_CREATE = "EXAM_CREATE",
  EXAM_LOADING = "EXAM_LOADING",
  EXAM_LOAD = "EXAM_LOAD",
  EXAM_REMOVE = "EXAM_REMOVE",
  EXAM_CLOSE_POPUP = "EXAM_CLOSE_POPUP",
}