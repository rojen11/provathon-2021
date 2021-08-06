import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useActions } from "./store/useActions";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Loading from "./components/Loading";

function App() {
  // Lazy loading routes
  const Login = lazy(() => import("./Pages/Login"));
  const Landing = lazy(() => import("./Pages/Landing"));
  const TeacherDashboard = lazy(() => import("./Pages/TeacherDashboard"));
  const StudentDashboard = lazy(() => import("./Pages/StudentDashboard"));
  const TeacherStudentList = lazy(
    () => import("./Pages/TeacherDashboard/Pages/Students")
  );
  const TeacherCreateExam = lazy(
    () => import("./Pages/TeacherDashboard/Pages/CreateExam")
  );

  const { loadUser } = useActions();

  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      {authState.isLoading ? (
        <div className="grid place-content-center h-screen w-screen">
          <Loading />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="grid place-content-center h-screen w-screen">
              <Loading />
            </div>
          }
        >
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
              path="/dashboard/:courseId/exam/create"
              component={TeacherCreateExam}
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
