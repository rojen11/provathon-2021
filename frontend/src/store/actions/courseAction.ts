import { api } from "../../api";
import { ActionType } from "./types";

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

export const loadCourse = () => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.COURSE_LOADING });
    api({
      query: `query {
                course {
                    id,
                    name,
                    code,
                }
            }`,
    }).then((res) => {
      const data = res.data.data;
      if (data != null && data.course !== undefined) {
        dispatch({
          type: ActionType.COURSE_LOAD,
          payload: { courses: [...data.course] },
        });
      }
    });
  };
};

export const selectCourse = (id: string) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.COURSE_SELECT, payload: { id } });
  };
};
