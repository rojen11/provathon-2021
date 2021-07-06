import ExamGrid from "../../Components/examGrid";
import SimpleButton from "../../Components/simplebutton";
import PopUp from "../../Components/popup";
import { useState, useEffect } from "react";
import Settings from "../../Components/settings";
import JoinCourse from "./joinCourse";
import { AnimatePresence, motion } from "framer-motion";
import Courses from "./courses";
import { connect } from "react-redux";
import * as ActionType from "../../Store/actionTypes";
import { onLoadExams } from "./../axiosGlobalFunctions";
import { useHistory } from "react-router-dom";
import { ConnectSocket } from "../../Socket/events";
import { Switch, Route } from "react-router-dom";

function StudentDashboard(props) {
  const [show, setShow] = useState(false);
  const [join, setJoin] = useState(false);
  const [course, setCourse] = useState(-1);

  const history = useHistory();

  useEffect(() => {
    if (course !== -1) {
      onLoadExams(course);
    }
  }, [course]);

  return (
    <div className="">
      <Title topProps={props} joinState={[join, setJoin]} />
      <AnimatePresence>
        <motion.div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
          {join && <JoinCourse joinState={[join, setJoin]} />}
        </motion.div>
      </AnimatePresence>
      <PopUp
        click={() => setShow(false)}
        color="blue"
        show={show}
        setShow={setShow}
        title="Exam Hasn't Started"
        body="The exam has not started, please wait until the start time of the
          exam. If you have any issues please email us at support."
        buttonName="Okay"
      />
      <Switch>
        <Route exact path="/dashboard/exams">
          <ExamGrid
            click={(id) => {
              //setShow(true);
              history.push("/exam");
              ConnectSocket(id);
            }}
            gridCols={4}
            p="p-10 gap-y-10"
            cards={props.exams}
          />
        </Route>
        <Route path={["/dashboard", "/"]}>
          <Courses courseState={[course, setCourse]} />
        </Route>
      </Switch>
    </div>
  );
}

function Title(props) {
  return (
    <div className="flex items-center">
      <div className="flex">
        <Settings tabs={[[]]} />
        <div className="text-3xl">
          {props.topProps.firstName + " " + props.topProps.lastName}
        </div>
      </div>
      <div className="p-5 flex flex-grow justify-center">
        <div className="border-b-4 border-black w-40 mb-5 mr-5"></div>
        <div className="text-5xl">Your Exams & Quizzes</div>
        <div className="border-b-4 border-black w-40 mb-5 ml-5"></div>
      </div>
      <div className="mr-7">
        <SimpleButton
          click={() => props.joinState[1](true)}
          name="Add Course"
          color="green"
          xspacing="5"
          yspacing="4"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              color="white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    exams: state.ExamReducer.exams,
    firstName: state.AuthReducer.firstName,
    lastName: state.AuthReducer.lastName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadExams: (val) => dispatch({ type: ActionType.LOAD_EXAMS, exams: val }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
