import { lazy } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/index";

export default function StudentRoute() {
  let { path } = useRouteMatch();

  const ExamListView = lazy(
    () => import("../../Pages/StudentDashboard/Pages/ExamList")
  );
  const ExamView = lazy(
    () => import("../../Pages/StudentDashboard/Pages/Exam")
  );

  return (
    <Switch>
      <>
        <ProtectedRoute
          exact
          path={`${path}/student/:courseId/exams`}
          component={ExamListView}
          auth={true}
          isTeacher={false}
          redirect="/login"
        />
        <ProtectedRoute
          exact
          path={`${path}/student/:courseId/exams/:examId`}
          component={ExamView}
          auth={true}
          isTeacher={false}
          redirect="/login"
        />
      </>
    </Switch>
  );
}
