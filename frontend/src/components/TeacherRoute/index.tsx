import { lazy } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/index";

export default function TeacherRoute() {
  let { path } = useRouteMatch();

  const TeacherStudentList = lazy(
    () => import("../../Pages/TeacherDashboard/Pages/Students")
  );
  const TeacherCreateExam = lazy(
    () => import("../../Pages/TeacherDashboard/Pages/CreateExam")
  );

  const TeacherExamListView = lazy(
    () => import("../../Pages/TeacherDashboard/Pages/PreviousExam")
  );

  const ExamDetailView = lazy(
    () => import("../../Pages/TeacherDashboard/Pages/ExamDetail")
  );

  const TicketView = lazy(
    () => import("../../Pages/TeacherDashboard/Pages/Ticket")
  );

  const LogView = lazy(() => import("../../Pages/TeacherDashboard/Pages/Log"));

  return (
    <Switch>
      <>
        <ProtectedRoute
          exact
          path={`${path}/:courseId/students`}
          component={TeacherStudentList}
          auth={true}
          isTeacher={true}
          redirect="/login"
        />
        <ProtectedRoute
          exact
          path={`${path}/:courseId/exam/create`}
          component={TeacherCreateExam}
          auth={true}
          isTeacher={true}
          redirect="/login"
        />
        <ProtectedRoute
          exact
          path={`${path}/:courseId/exams`}
          component={TeacherExamListView}
          auth={true}
          isTeacher={true}
          redirect="/login"
        />
        <ProtectedRoute
          exact
          path={`${path}/:courseId/exams/:examId`}
          component={ExamDetailView}
          auth={true}
          isTeacher={true}
          redirect="/login"
        />
        <ProtectedRoute
          exact
          path={`${path}/:courseId/exams/:examId/ticket`}
          component={TicketView}
          auth={true}
          isTeacher={true}
          redirect="/login"
        />
        <ProtectedRoute
          exact
          path={`${path}/:courseId/exams/:examId/log`}
          component={LogView}
          auth={true}
          isTeacher={true}
          redirect="/login"
        />
      </>
    </Switch>
  );
}
