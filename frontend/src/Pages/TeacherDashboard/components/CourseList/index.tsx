import SimpleButton from "../../../../components/SimpleButton";
import { useEffect } from "react";
import { useActions } from "../../../../store/useActions";
import Loading from "../../../../components/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import CourseButton from "../CourseButton";
import { Course } from "../../../../store/reducers/courseReducer";
import { useParams, Link } from "react-router-dom";

type Props = {
  setShowPopup: Function;
};

type CourseParams = {
  courseId: string;
};

export default function CourseList({ setShowPopup }: Props) {
  const { loadCourse, selectCourse } = useActions();

  const courseState = useSelector((state: RootState) => state.course);

  const { courseId } = useParams<CourseParams>();

  useEffect(() => {
    loadCourse();
    selectCourse(courseId);
  }, []);

  return (
    <>
      <div className="bg-white w-full text-center h-full rounded-lg shadow-lg relative filter drop-shadow-lg flex flex-col">
        <div className="text-4xl pb-5 pt-2">Course List</div>
        <div className="-left-1 flex-grow">
          {courseState.isLoading ? (
            <div className="w-full h-full grid place-content-center">
              <Loading />
            </div>
          ) : (
            courseState.courses.map((c: Course) => (
              <Link to={`/dashboard/${c.id}/students`} key={c.id}>
                <CourseButton
                  color={
                    courseState.active !== null &&
                    courseState.active.id === c.id
                      ? "bg-green-400"
                      : "bg-white"
                  }
                  hoverColor={
                    courseState.active !== null &&
                    courseState.active.id === c.id
                      ? "bg-green-400"
                      : "bg-gray-200"
                  }
                  m="mt-5"
                  key={c.id}
                  name={c.name}
                  handleClick={() => selectCourse(c.id)}
                />
              </Link>
            ))
          )}
        </div>
        <div className="relative h-24">
          <div className="absolute bottom-0 mb-5">
            <SimpleButton
              click={() => setShowPopup(true)}
              color="blue"
              xspacing="3"
              yspacing="3"
              rounded="rounded-full"
              p="ml-5 focus:ring-4 focus:border-blue-300"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  color="white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              }
            />
          </div>
          <div className="absolute bottom-0 right-0 mb-5">
            <SimpleButton
              //   click={() => props.deleteState[1](true)}
              color="red"
              xspacing="3"
              yspacing="3"
              rounded="rounded-full"
              mr="5"
              p="focus:ring-4 focus:ring-red-300"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  color="white"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
