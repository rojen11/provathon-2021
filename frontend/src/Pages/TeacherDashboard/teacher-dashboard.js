import ItemButton from "../../Components/itemButton";
import CreateExam from "./creatorExam";
import { useState, useEffect } from "react";
import MarkExams from "./markExams";
import Students from "./students";
import SendNotification from "./sendNotification";
import PreviousExams from "./previousExams";
import CreateCourse from "./createCourse";
import { AnimatePresence, motion } from "framer-motion";
import Settings from "../../Components/settings";
import AxiosFunction from "../../Store/axiosFunction";
import PopUp from "./../../Components/popup";
import CourseList from "./courseList";
import { connect } from "react-redux";
import * as ActionType from "../../Store/actionTypes";
import { onLoadExams, onLoadStudents } from "./../axiosGlobalFunctions";

function TeacherDashboard(props) {
  const [nav, setNav] = useState("students");
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [course, setCourse] = useState({ name: "", code: "" });

  useEffect(() => {
    //Load Exams
    if (selected !== -1) {
      onLoadExams(selected);
      onLoadStudents(selected);
    }
  }, [selected]);

  function onDeleteCourse() {
    AxiosFunction(`mutation {
      deleteCourse(id:${selected}) {
          success
          id
      }
  }`).then((res) => {
      const data = res.data.data.deleteCourse;
      if (data.success) {
        props.onDeleteCourse(selected);
      }
    });
  }

  return (
    <div
      className="grid grid-cols-5 p-5 place-items-center gap-x-7"
      style={{ height: "100vh" }}
    >
      <AnimatePresence>
        <motion.div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 text-xl z-10">
          {show && <CreateCourse showState={[show, setShow]} />}
        </motion.div>
      </AnimatePresence>
      <PopUp
        click={() => onDeleteCourse()}
        show={del}
        setShow={setDelete}
        title="Are You Sure?"
        body="Do you want to delete the course selected? Deleting the course will remove all data related to the course permanently."
        buttonName="Delete"
        color="red"
      />
      <CourseList
        showState={[show, setShow]}
        deleteState={[del, setDelete]}
        selectState={[selected, setSelected]}
        courseState={[course, setCourse]}
      />
      <div className="col-span-4 bg-white h-full w-full rounded-lg relative">
        <Title courseState={[course, setCourse]} />
        <div className="grid place-items-center">
          {nav === "create" ? (
            <CreateExam selectState={[selected, setSelected]} />
          ) : (
            ""
          )}
          {nav === "students" ? <Students /> : ""}
          {nav === "mark" ? <MarkExams /> : ""}
          {nav === "previous" ? (
            <PreviousExams selectState={[selected, setSelected]} />
          ) : (
            ""
          )}
          {nav === "notify" ? <SendNotification /> : ""}
        </div>
        <Nav change={setNav} />
      </div>
    </div>
  );
}

function Nav(props) {
  return (
    <div className="mt-7 bg-white bg-opacity-10 p-5 absolute bottom-0 w-full justify-around flex">
      <ItemButton
        click={() => props.change("students")}
        name="Students"
        p="mr-5"
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
      <ItemButton
        click={() => props.change("create")}
        name="Create Exam"
        p="mr-5"
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
      <ItemButton
        click={() => props.change("previous")}
        name="Previous Exams"
        p="mr-5"
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
      <ItemButton
        click={() => props.change("mark")}
        name="Mark Exams"
        p="mr-5"
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        }
      />
      <ItemButton
        click={() => props.change("notify")}
        name="Send Notifcation"
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
    </div>
  );
}

function Title(props) {
  return (
    <div className="flex justify-center p-5">
      <Settings tabs={[[]]} />
      <div className="flex flex-grow justify-center">
        <div className="border-b-4 border-black w-40 mb-5 mr-5"></div>
        <div className="text-5xl uppercase">{props.courseState[0].name}</div>
        <div className="border-b-4 border-black w-40 mb-5 ml-5"></div>
      </div>
      <div className="text-2xl">Course Code: {props.courseState[0].code}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    courses: { ...state.CourseReducer.courses },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteCourse: (val) =>
      dispatch({ type: ActionType.DELETE_COURSE, id: val }),
    onLoadExams: (val) => dispatch({ type: ActionType.LOAD_EXAMS, exams: val }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard);
