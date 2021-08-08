import { api } from "../../api";
import { ActionType } from "./types";

export const loadStudents = (id: string) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.STUDENT_LOADING });
    api({
      query: `
          query ($id: ID!) {
              studentByCourse (courseId: $id) {
                  id
                  firstName
                  lastName
                  email
              }
          }
        `,
      variables: { id },
    }).then((res) => {
      const data = res.data.data.studentByCourse;
      if (data !== null) {
        dispatch({
          type: ActionType.STUDENT_LOAD,
          payload: { students: data },
        });
      }
    });
  };
};
