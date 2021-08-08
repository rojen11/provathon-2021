import ItemButton from "../../../../components/ItemButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function Navbar() {
  const course = useSelector((state: RootState) => state.course);

  const id = course.active !== null ? course.active.id : "";

  const disabled = id === "";

  const disabledClass = disabled ? "pointer-events-none" : "";

  return (
    <div className="mt-7 bg-white bg-opacity-10 p-5 absolute bottom-0 w-full justify-around flex">
      <Link to={`/dashboard/${id}/students`} className={disabledClass}>
        <ItemButton
          name="Students"
          p="mr-5"
          disabled={disabled}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />
      </Link>
      <Link to={`/dashboard/${id}/exam/create`} className={disabledClass}>
        <ItemButton
          // click={() => props.change("create")}
          name="Create Exam"
          p="mr-5"
          disabled={disabled}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </Link>
      <Link to={`/dashboard/${id}/exams`} className={disabledClass}>
        <ItemButton
          // click={() => props.change("previous")}
          name="Exams"
          p="mr-5"
          disabled={disabled}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          }
        />
      </Link>
      <Link to="" className={disabledClass}>
        <ItemButton
          // click={() => props.change("notify")}
          name="Send Notifcation"
          disabled={true}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </Link>
    </div>
  );
}
