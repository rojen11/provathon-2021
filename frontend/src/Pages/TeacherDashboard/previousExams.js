import ExamGrid from "../../Components/examGrid";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ConnectSocket } from './../../Socket/events';

function PreviousExams(props) {
  const history = useHistory();
  return (
    <ExamGrid
      click={(id) =>{ 
        ConnectSocket(id);
        history.push("/teacher-ticket");}
      }
      gridCols={3}
      p="gap-y-5 gap-x-10 pt-5"
      cards={props.exams}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    exams: state.ExamReducer.exams,
  };
};

export default connect(mapStateToProps)(PreviousExams);
