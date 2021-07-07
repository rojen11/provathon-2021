import Paper from "@material-ui/core/Paper";
import { useEffect } from "react";
import AxiosFunction from "../../Store/axiosFunction";
import * as ActionType from "../../Store/actionTypes";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Courses(props) {
  useEffect(() => {
    AxiosFunction(`query {
        course {
            id,
            name,
            examSet {
              id
            }
            primaryTeacher{
              id
              firstName
              lastName
            }
        }
    }`).then((res) => {
      const data = res.data.data.course;
      props.onLoadCourses(data);
    });
  }, []);
  const history = useHistory();
  return (
    <div className="grid grid-cols-3 place-items-center mt-10">
      {props.courses.map((course) => (
        <CourseCard
          click={() => {
            props.courseState[1](course.id);
            history.push("/dashboard/exams");
          }}
          name={course.name}
          exams={course.examSet.length}
          teacherName={course.primaryTeacher.firstName + " " + course.primaryTeacher.lastName}
        />
      ))}
    </div>
  );
}

function CourseCard({ name, click, exams, teacherName }) {
  return (
    <Paper
      onClick={click}
      elevation={5}
      className="cursor-pointer w-72 h-52 relative"
    >
      <div className="text-4xl p-5 pb-0">{name}</div>
      <div className="p-5 pt-2 text-gray-500 text-xl">Teacher: {teacherName}</div>
      <div className="absolute bottom-0 bg-green-500 w-full h-12 grid place-items-center">
        <div className="text-white text-center text-xl">
          Total Exams: {exams}
        </div>
      </div>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    courses: [...state.CourseReducer.courses],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadCourses: (val) =>
      dispatch({
        type: ActionType.LOAD_COURSES,
        courses: val,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
