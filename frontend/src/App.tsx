import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useActions } from "./store/useActions";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  // Lazy loading routes
  const Login = lazy(() => import("./Pages/Login"));
  const Landing = lazy(() => import("./Pages/Landing"));
  const TeacherDashboard = lazy(() => import("./Pages/TeacherDashboard"));
  const StudentDashboard = lazy(() => import("./Pages/StudentDashboard"));
  const TeacherStudentList = lazy(() => import("./Pages/TeacherDashboard/Pages/Students"))

  const { loadUser } = useActions();

  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    loadUser();
    console.log("here");
  }, []);

  return (
    <Router>
      {!authState.isLoading && (
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <ProtectedRoute
              exact
              path="/dashboard"
              teacher={TeacherDashboard}
              student={StudentDashboard}
              auth={true}
              redirect="/login"
            />
            <ProtectedRoute
              exact
              path="/dashboard/:courseId/students"
              component={TeacherStudentList}
              auth={true}
              isTeacher={true}
              redirect="/login"
            />

            <ProtectedRoute
              exact
              path="/login"
              component={Login}
              auth={false}
              redirect="/dashboard"
            />
          </Switch>
        </Suspense>
      )}
    </Router>
  );
}

export default App;
