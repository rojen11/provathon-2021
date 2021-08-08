import { useEffect } from "react";
import { useActions } from "../../../../store/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ExamCard from "../../../../components/ExamCard";
import moment from "moment";
import Layout from "../../components/Layout/index";
import { Link, useRouteMatch } from "react-router-dom";

export default function PreviousExams() {
  const { loadExams } = useActions();

  const { url } = useRouteMatch();

  const reducerState = useSelector((state: RootState) => ({
    exam: state.exam,
    course: state.course,
  }));

  useEffect(() => {
    if (reducerState.course.active !== null) {
      loadExams(reducerState.course.active.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div
        className={`grid grid-cols-3 gap-y-5 gap-x-10 pt-5 place-items-center`}
      >
        {reducerState.exam.exams.map((exam) => (
          <Link to={`${url}/${exam.id}/ticket`}>
            <ExamCard
              key={exam.id}
              // click={() => click(exam.id)}
              title={exam.name}
              examDuration={
                moment
                  .duration(moment(exam.endTime).diff(moment(exam.startTime)))
                  .hours() + " hours"
              }
              startTime={exam.startTime}
              submit={exam.submitDuration}
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
}
