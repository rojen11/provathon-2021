import { Link } from "react-router-dom";
import CourseCard from "./components/CourseCard";
import Header from "./components/Header";
import { useEffect } from "react";
import { useActions } from "../../store/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function StudentDashboard() {
  const { loadCourse } = useActions();

  const courseState = useSelector((state: RootState) => state.course);

  useEffect(() => {
    loadCourse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      <div className="grid grid-cols-3 place-items-center mt-10">
        {courseState.courses.map((course) => (
          <Link to={`/dashboard/student/${course.id}/exams`}>
            <CourseCard
              name={course.name}
              exams={course.examSet ? course.examSet.length : 0}
              teacherName={
                course.primaryTeacher
                  ? course.primaryTeacher.firstName +
                    " " +
                    course.primaryTeacher.lastName
                  : ""
              }
            />
          </Link>
        ))}
      </div>
    </>
  );
}
