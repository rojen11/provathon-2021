import { FunctionComponent } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type ProtectedRouteProps = {
  component?: FunctionComponent;
  teacher?: FunctionComponent;
  student?: FunctionComponent;
  auth: Boolean;
  redirect: string;
  isTeacher?: Boolean;
} & RouteProps;

/**
 *
 * @param component Component to render for given route
 * @param auth Redirect depending on this condition for authentication
 * @param redirect path to redirect to for auth condition
 * @returns
 */
export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  component: Component,
  teacher: Teacher,
  student: Student,
  auth,
  redirect,
  isTeacher,
  ...rest
}) => {
  const authState = useSelector((state: RootState) => state.auth);

  console.log(authState);

  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (authState.isAuthenticated && auth) {
          if (Student !== undefined && Teacher !== undefined) {
            if (authState.user.isTeacher) {
              return <Teacher {...props} />;
            }
            return <Student {...props} />;
          }
          if (Component !== undefined) {
            if (isTeacher === authState.user.isTeacher) {
              return <Component {...props} />;
            }
          }
        } else if (!auth && !authState.isAuthenticated && Component !== undefined) {
          return <Component {...props} />;
        }
        return <Redirect to={redirect} />;
      }}
    />
  );
};
