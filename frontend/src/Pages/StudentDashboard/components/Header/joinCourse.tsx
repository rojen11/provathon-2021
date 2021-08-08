import { motion } from "framer-motion";
import PopupInput from "../../../../components/PopupInput";
import { useActions } from "../../../../store/useActions";

type Props = {
  handleClose: (state: boolean) => void;
};

export default function JoinCourse({ handleClose }: Props) {
  const { joinCourse } = useActions();

  return (
    <motion.div initial={{ y: -1000 }} animate={{ y: 0 }}>
      <PopupInput
        title="Join Course"
        inputLabel="Enter Course Code"
        handleButtonClick={(value: string) => {
          joinCourse(value);
          handleClose(false);
        }}
        handleClose={() => handleClose(false)}
      />
    </motion.div>
  );
}
