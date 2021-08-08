import { Paper } from "@material-ui/core";
import moment from "moment";

type Props = {
  title: string;
  examDuration: string;
  submit: string;
  startTime: string;
  // handleClick: () => void;
};

export default function ExamCard({
  title,
  examDuration,
  submit,
  startTime,
  // handleClick,
}: Props) {
  return (
    <Paper
      // onClick={handleClick}
      elevation={5}
      className="bg-gray-100 relative h-60 w-80 rounded-lg cursor-pointer"
    >
      <div className="p-5 pt-2 pb-2 border-b-2 border-black">
        <div className="text-3xl uppercase">{title}</div>
      </div>
      <div className="p-5 pt-5">
        <div className="text-md">Exam Duration: {examDuration}</div>
        <div className="text-md mt-1">Submit Duration: {submit}</div>
      </div>
      <div className="absolute bottom-0 bg-green-500 w-full h-16 grid items-center rounded-b-lg">
        <div className="text-white text-center text-xl">
          Exam Time: {moment(startTime).format("MM/D/YY,h:mm A")}
        </div>
      </div>
    </Paper>
  );
}
