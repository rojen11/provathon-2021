import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Exam from "./Pages/StudentDashboard/exam";
import Landing from "./Pages/landing";
import Login from ".//Pages/login";
import SignUp from "./Pages/signup";
import StudentDashboard from "./Pages/StudentDashboard/studentDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard/teacher-dashboard";
import TeacherTicketManagement from "./Pages/TeacherTicketManagement";
import { connect } from "react-redux";
import AccessDenied from "./Pages/accessDenied";
import { useEffect } from "react";
import AxiosFunction from "./Store/axiosFunction";
import * as ActionType from "./Store/actionTypes";

function PageSetup(props) {
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken !== null) {
      AxiosFunction(`mutation {
        refreshToken(
          refreshToken: "${refreshToken}"
        ) {
          success,
          errors,
          payload,
          token,
          refreshToken,
        }
      }`).then((res) => {
        const data = res.data.data.refreshToken;
        props.onStoreAccessToken(data.token);
        if (data.success) {
          AxiosFunction(
            `query {
            me {
              firstName,
              lastName,
              pk,
              isTeacher,
              email,
            }
          }`,
            data.token
          ).then((res) => {
            const data = res.data.data.me;
            props.onStoreUser({
              id: data.pk,
              firstName: data.firstName,
              lastName: data.lastName,
              isTeacher: data.isTeacher,
            });
          });
        }
      });
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/testing">
          <AccessDenied />
        </Route>
        {props.userID === "" ? (
          <UnsecureRoute />
        ) : (
          <SecureRoute props={props} />
        )}
      </Switch>
    </Router>
  );
}

function SecureRoute(props) {
  return (
    <Switch>
      <Route exact path="/exam">
        <Exam />
      </Route>
      <Route exact path="/teacher-ticket">
        {props.props.isTeacher ? <TeacherTicketManagement /> : <AccessDenied />}
      </Route>
      <Route path={["/dashboard", "/"]}>
        {props.props.isTeacher ? <TeacherDashboard /> : <StudentDashboard />}
      </Route>
    </Switch>
  );
}

function UnsecureRoute(props) {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/">
        <SignUp />
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => {
  return {
    userID: state.AuthReducer.userID,
    accessToken: state.AuthReducer.accessToken,
    isTeacher: state.AuthReducer.isTeacher,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreUser: (val) =>
      dispatch({
        type: ActionType.STORE_USER,
        user: { ...val },
      }),
    onStoreAccessToken: (token) =>
      dispatch({ type: ActionType.STORE_ACCESSTOKEN, token: token }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSetup);
