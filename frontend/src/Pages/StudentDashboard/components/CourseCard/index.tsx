import { Paper } from "@material-ui/core";

type Props = {
  name: string;
  exams: number;
  teacherName: string;
};

export default function CourseCard({
  name,
  exams,
  teacherName,
}: Props) {
  return (
    <Paper
      elevation={5}
      className="cursor-pointer w-72 h-52 relative"
    >
      <div className="text-4xl p-5 pb-0">{name}</div>
      <div className="p-5 pt-2 text-gray-500 text-xl">
        Teacher: {teacherName}
      </div>
      <div className="absolute bottom-0 bg-green-500 w-full h-12 grid place-items-center">
        <div className="text-white text-center text-xl">
          Total Exams: {exams}
        </div>
      </div>
    </Paper>
  );
}
