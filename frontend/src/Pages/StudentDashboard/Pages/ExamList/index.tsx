import { Link, useParams, useRouteMatch } from "react-router-dom";
import ExamCard from "../../../../components/ExamCard";
import Header from "../../components/Header";
import { useActions } from "../../../../store/useActions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import moment from "moment";

export default function ExamList() {
  const examState = useSelector((state: RootState) => state.exam);

  const { courseId } = useParams<{ courseId: string }>();

  const { loadExams } = useActions();

  const { url } = useRouteMatch();


  useEffect(() => {
    loadExams(courseId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="p-5">
        {examState.exams.map((exam) => (
          <Link to={`${url}/${exam.id}`}>
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
    </>
  );
}
