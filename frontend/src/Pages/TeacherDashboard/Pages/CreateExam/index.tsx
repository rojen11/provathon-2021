import { Paper } from "@material-ui/core";
import TextInput from "../../../../components/TextInput";
import EnterDateTime from "../../components/EnterDateTime";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import PopUp from "../../../../components/Popup";
import { useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import PopupLoading from "../../../../components/PopupLoading/index";
import { useActions } from "../../../../store/useActions";
import { useParams } from "react-router-dom";

export default function CreateExam() {
  // Fields state
  const [form, setForm] = useState({
    name: "",
    startTime: "",
    endTime: "",
    totalMarks: 0,
    submitDuration: 0,
  });

  const examState = useSelector((state: RootState) => state.exam);

  const { closePopup, createExam } = useActions();

  const { courseId } = useParams<{ courseId: string }>();

  // Update form data on field change
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) {
    setForm({ ...form, [key]: e.target.value });
  }

  function handleSubmit() {
    // empty check
    if (
      form.name === "" ||
      form.startTime === "" ||
      form.endTime === "" ||
      form.totalMarks === 0
    )
      return;

    createExam({ ...form, courseId: Number(courseId) });
  }

  return (
    <Layout>
      <>
        <Paper elevation={5} className="flex flex-col w-1/2 mt-7 p-5 gap-y-5">
          <TextInput
            change={(e) => handleChange(e, "name")}
            label="Exam Name"
            value={form.name}
          />
          <div className="flex justify-center items-center">
            <EnterDateTime
              change={(e) => handleChange(e, "startTime")}
              label="Start Date"
              value={form.startTime}
            />
            <div className="text-xl mx-5">To</div>
            <EnterDateTime
              change={(e) => handleChange(e, "endTime")}
              label="End Date"
              value={form.endTime}
            />
          </div>
          <div className="flex justify-around">
            <div className="flex items-center gap-x-2">
              <div className="text-xl text-gray-500">Submit Duration: </div>
              <TextField
                onChange={(e) => handleChange(e, "submitDuration")}
                variant="outlined"
                className="w-14"
                size="small"
                placeholder="0"
              />
              <div className="text-xl text-gray-500">Minutes</div>
            </div>
            <TextInput
              change={(e) => handleChange(e, "totalMarks")}
              label="Total Marks"
              p="w-40"
              value={form.totalMarks}
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            className="w-62"
            size="large"
          >
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Upload Exam Paper
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            className="p-4 mt-1 w-full text-white bg-green-500"
          >
            Create Exam
          </Button>
        </Paper>
        {examState.showPopup &&
          (examState.isLoading ? (
            <PopupLoading />
          ) : (
            <PopUp
              show={true}
              close={() => closePopup()}
              title="Exam Has Been Created"
              body="This exam has been created and sent out to students in this course. Please be sure to provide support using tickets feature."
              buttonName="OKAY"
              color="green"
            />
          ))}
      </>
    </Layout>
  );
}
