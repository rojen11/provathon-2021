import { RootState } from "..";
import { api } from "../../api";
import { ActionType } from "./types";

type LoginProps = {
  email: string;
  password: string;
};

type SignupProps = {
  email: string;
  password1: string;
  password2: string;
  firstName: string;
  lastName: string;
  isTeacher: boolean;
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

export const logout = () => {
  return (dispatch: Function, getState: () => RootState) => {
    if (getState().auth.isAuthenticated) {
      const refreshToken = localStorage.getItem("refreshToken");

      // remove tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      api({
        query: `
              mutation ($refreshToken: String!) {
                revokeToken(
                  refreshToken: $refreshToken
                ) {
                  success,
                  errors
                }
              }
      `,
        variables: { refreshToken },
      }).then((res) => {
        const data = res.data.data.revokeToken;
        if (data.success) {
          dispatch({ type: ActionType.LOGOUT_SUCCESS });
        }
      });
    }
  };
};

export const signup = (params: SignupProps) => {
  return (dispatch: Function) => {
    dispatch({ type: ActionType.LOADING });
    api({
      query: `
        mutation ($email: String!, $password1: String!, $password2: String!, $firstName: String!, $lastName: String!, $isTeacher: Boolean!) {
          register(
            email: $email,
            password1: $password1,
            password2: $password2,
            firstName: $firstName,
            lastName: $lastName,
            isTeacher: $isTeacher
          ) {
            success,
            errors,
            token,
            refreshToken
          }
        }
    `,
      variables: params,
    }).then((res) => {
      const data = res.data.data.register;
      if (data.success === true) {
        dispatch({
          type: ActionType.REGISTER_SUCCESS,
        });
      } else {
        // handle error
      }
    });
  };
};
