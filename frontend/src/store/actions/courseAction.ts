import { api } from "../../api";
import { ActionType } from "./types";

// Add a course
export const addCourse = (name: string) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.COURSE_LOADING });

    api({
      query: `
            mutation createCourse($name: String!) {
                createCourse(name: $name, limit:-1) {
                    course {
                        id,
                        name,
                        code,
                    }
                }
            }
        `,
      variables: { name },
    }).then((res) => {
      const data = res.data.data.createCourse;
      if (data.course !== null) {
        dispatch({
          type: ActionType.COURSE_ADD,
          payload: { course: { ...data.course } },
        });
        dispatch({ type: ActionType.LOADED });
      }
    });
  };
};

// Load all course on init
export const loadCourse = (id?: string) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.COURSE_LOADING });
    api({
      query: `query {
                course {
                    id
                    name
                    code
                    examSet {
                      id
                    }
                    primaryTeacher{
                      id
                      firstName
                      lastName
                    }
                }
            }`,
    }).then((res) => {
      const data = res.data.data;
      console.log(data);
      if (data != null && data.course !== undefined) {
        dispatch({
          type: ActionType.COURSE_LOAD,
          payload: { courses: [...data.course] },
        });
        if (id !== null) {
          dispatch({ type: ActionType.COURSE_SELECT, payload: { id } });
        }
      }
    });
  };
};

// Set a course as active
export const selectCourse = (id: string) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.COURSE_SELECT, payload: { id } });
  };
};

// Delete a course
export const deleteCourse = (id: string) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.COURSE_LOADING });
    api({
      query: `
          mutation ($id: Int!) {
            deleteCourse(id:$id) {
                success
                id
            }
        }
    `,
      variables: { id },
    }).then((res) => {
      const data = res.data.data.deleteCourse;
      if (data !== null && data.success === true) {
        dispatch({ type: ActionType.COURSE_REMOVE, payload: { id: data.id } });
      } else {
        // handle error
      }
    });
  };
};

export const joinCourse = (code: string) => {
  return (dispatch: Function) => {
    api({
      query: `
          mutation ($code: String!) {
            joinCourse(code: $code) {
                success,
                course {
                    id
                    name
                    examSet {
                      id
                    }
                    primaryTeacher{
                      id
                      firstName
                      lastName
                    }
                }
            }
          }
    `,
      variables: { code },
    }).then((res) => {
      const data = res.data.data.joinCourse;
      if (data !== null) {
        if (data.success === true) {
          dispatch({
            type: ActionType.COURSE_JOIN,
            payload: { course: data.course },
          });
        }
      }
    });
  };
};
