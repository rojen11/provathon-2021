import { api } from "../../api";
import { ActionType } from "./types";

type LoginProps = {
  email: string;
  password: string;
};

// load user on page load
export const loadUser = () => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.LOADING });

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken != null) {
      api({
        query: `query {
            me {
                pk,
                firstName,
                lastName,
                isTeacher
            }
        }`,
      }).then((res) => {
        const data = res.data.data.me;
        if (data !== null) {
          dispatch({
            type: ActionType.USER_LOADED,
            payload: { user: { ...data } },
          });
        }
      });
    } else {
      dispatch({ type: ActionType.LOGIN_FAIL });
    }
  };
};

export const login = ({ email, password }: LoginProps) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.LOADING });

    api({
      query: `mutation tokenAuth($email: String!, $password: String!) {
            tokenAuth(
            email: $email
            password: $password
          ) {
            success,
            errors,
            refreshToken,
            token
            user {
              pk,
              firstName,
              lastName,
              isTeacher,
              email
            }
          }
        }`,
      variables: { email, password },
    }).then((res) => {
      const data = res.data.data.tokenAuth;
      if (data !== null) {
        if (data.success === true) {
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          dispatch({
            type: ActionType.LOGIN_SUCCESS,
            payload: { user: { ...data.user } },
          });
        }
      }
    });
  };
};
