import { motion } from "framer-motion";
import AxiosFunction from "../../Store/axiosFunction";
import { useState } from "react";
import { connect } from "react-redux";
import * as ActionType from "../../Store/actionTypes";
import PopUpV2 from "../../Components/popupv2";

function CreateCourse(props) {
  const [course, setCourse] = useState();
  function onCreateCourse() {
    AxiosFunction(`mutation {
      createCourse(name: "${course}", limit:-1) {
          course {
              id,
              name,
              code,
          }
      }
  }`).then((res) => {
      const data = res.data.data.createCourse.course;
      props.onAddCourse(data);
    });
  }
  return (
    <motion.div initial={{ x: -1000 }} animate={{ x: 0 }} exit={{ x: -1000 }}>
      <PopUpV2
        click={() => props.showState[1](false)}
        change={(e) => setCourse(e.target.value)}
        apiFunction={onCreateCourse}
        title="Create Course"
        inputLabel="Enter Course Name"
      />
    </motion.div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCourse: (val) =>
      dispatch({ type: ActionType.ADD_COURSE, course: val }),
  };
};

export default connect(null, mapDispatchToProps)(CreateCourse);
