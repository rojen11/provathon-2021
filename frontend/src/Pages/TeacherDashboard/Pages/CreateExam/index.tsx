import { Paper } from "@material-ui/core";
import TextInput from "../../../../components/TextInput";
import EnterDateTime from "../../components/EnterDateTime";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import PopUp from "../../../../components/Popup";
import { useState } from "react";
import Layout from "../../components/Layout";

export default function CreateExam() {
  const [show, setShow] = useState(false);

  return (
    <Layout>
      <Paper elevation={5} className="flex flex-col w-1/2 mt-7 p-5 gap-y-5">
        <TextInput change={(e) => {}} label="Exam Name" />
        <div className="flex justify-center items-center">
          <EnterDateTime change={(e) => {}} label="Start Date" />
          <div className="text-xl mx-5">To</div>
          <EnterDateTime change={(e) => {}} label="End Date" />
        </div>
        <div className="flex justify-around">
          <div className="flex items-center gap-x-2">
            <div className="text-xl text-gray-500">Submit Duration: </div>
            <TextField
              onChange={(e) => {}}
              variant="outlined"
              className="w-14"
              size="small"
              placeholder="0"
            />
            <div className="text-xl text-gray-500">Minutes</div>
          </div>
          <TextInput change={(e) => {}} label="Total Marks" p="w-40" />
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
          onClick={() => {}}
          variant="contained"
          size="large"
          className="p-4 mt-1 w-full text-white bg-green-500"
        >
          Create Exam
        </Button>
        <PopUp
          click={() => console.log()}
          show={show}
          setShow={setShow}
          title="Exam Has Been Created"
          body="This exam has been created and sent out to students in this course. Please be sure to provide support using tickets feautre."
          buttonName="OKAY"
          color="green"
        />
      </Paper>
    </Layout>
  );
}
