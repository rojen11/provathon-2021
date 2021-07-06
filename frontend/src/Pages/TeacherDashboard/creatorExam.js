import Input from "../../Components/input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AxiosFunction from "../../Store/axiosFunction";
import { useState } from "react";
import PopUp from "./../../Components/popup";
import { connect } from 'react-redux';
import * as ActionType from "../../Store/actionTypes";

function CreateExam(props) {
  const [show, setShow] = useState(false);
  const [exam, setExam] = useState({
    name: "",
    start: "",
    end: "",
    submitDuration: "",
    totalMarks: "",
  });
  function onCreateExam() {
    AxiosFunction(`mutation {
        createExam(
        name:"${exam.name}",
        courseId:${props.selectState[0]},
        startTime:"${exam.start}",
        endTime:"${exam.end}",
        submitDuration:${exam.submitDuration},
        totalMarks:${exam.totalMarks}) {
            exam {
                id
                name
                startTime
                endTime
                submitDuration
                totalMarks
                completed
            }
        }
    }`).then(res => {
      const data = res.data.data.createExam.exam;
      props.onAddExam(data)
      setShow(true);
    });
  }
  return (
    <Paper elevation={5} className="flex flex-col w-1/2 mt-7 p-5 gap-y-5">
      <Input
        change={(e) => setExam({ ...exam, name: e.target.value })}
        label="Exam Name"
      />
      <div className="flex justify-center items-center">
        <EnterDateTime
          change={(e) => setExam({ ...exam, start: e.target.value })}
          label="Start Date"
        />
        <div className="text-xl mx-5">To</div>
        <EnterDateTime
          change={(e) => setExam({ ...exam, end: e.target.value })}
          label="End Date"
        />
      </div>
      <div className="flex justify-around">
        <div className="flex items-center gap-x-2">
          <div className="text-xl text-gray-500">Submit Duration: </div>
          <TextField
            onChange={(e) =>
              setExam({ ...exam, submitDuration: e.target.value })
            }
            variant="outlined"
            className="w-14"
            size="small"
            placeholder="0"
          />
          <div className="text-xl text-gray-500">Minutes</div>
        </div>
        <Input
          change={(e) => setExam({ ...exam, totalMarks: e.target.value })}
          label="Total Marks"
          p="w-40"
        />
      </div>
      <Button variant="outlined" color="primary" className="w-62" size="large">
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
        onClick={() => {
          onCreateExam();
        }}
        variant="filled"
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
  );
}

function EnterDateTime({ label, change }) {
  return (
    <TextField
      onChange={change}
      variant="outlined"
      label={label}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddExam: (val) => dispatch({type: ActionType.ADD_EXAM, exam: val})
  };
};

export default connect(null, mapDispatchToProps)(CreateExam);