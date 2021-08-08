import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useActions } from "./store/useActions";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Loading from "./components/Loading";
import TeacherRoute from "./components/TeacherRoute";
import StudentRoute from "./components/StudentRoute";

// Log System

export let ipcRenderer: any = null;

try {
  const electron = window.require("electron");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ipcRenderer = electron.ipcRenderer;

  // @ts-ignore
  window.desktop = true;
} catch {
  console.log("browser");
}

function App() {
  // Lazy loading routes
  const Login = lazy(() => import("./Pages/Login"));
  const SignUp = lazy(() => import("./Pages/Signup"));
  const Landing = lazy(() => import("./Pages/Landing"));
  const TeacherDashboard = lazy(() => import("./Pages/TeacherDashboard"));
  const StudentDashboard = lazy(() => import("./Pages/StudentDashboard"));

  const { loadUser } = useActions();

  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <Route path="/dashboard">
              <TeacherRoute />
              <StudentRoute />
            </Route>

            <ProtectedRoute
              exact
              path="/login"
              component={Login}
              auth={false}
              redirect="/dashboard"
            />

            <ProtectedRoute
              exact
              path="/signup"
              component={SignUp}
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
