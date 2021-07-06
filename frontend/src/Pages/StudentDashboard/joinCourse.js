import { motion } from "framer-motion";
import PopUpV2 from "../../Components/popupv2";
import { useState } from "react";
import AxiosFunction from "../../Store/axiosFunction";

export default function JoinCourse(props) {
  const [courseCode, setCourseCode] = useState("");

  function onJoinCourse() {
    AxiosFunction(`mutation {
            joinCourse(code: "${courseCode}") {
                success,
                course {
                    id
                    name
                }
            }
        }`);
  }

  return (
    <motion.div initial={{ y: -1000 }} animate={{ y: 0 }}>
      <PopUpV2
        title="Join Course"
        inputLabel="Enter Course Code"
        click={() => props.joinState[1](false)}
        change={(e) => setCourseCode(e.target.value)}
        apiFunction={onJoinCourse}
      />
    </motion.div>
  );
}
