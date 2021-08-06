import PopupInput from "../../../../components/PopupInput";
import { motion } from "framer-motion";
import { useActions } from "../../../../store/useActions";

type Props = {
  show: boolean;
  handleClose: () => void;
};

export default function CreateCourse({ show, handleClose }: Props) {
  const { addCourse } = useActions();

  return (
    <motion.div initial={{ x: -1000 }} animate={{ x: 0 }} exit={{ x: -1000 }}>
      <PopupInput
        handleClose={handleClose}
        handleButtonClick={addCourse}
        title="Create Course"
        inputLabel="Enter Course Name"
      />
    </motion.div>
  );
}
