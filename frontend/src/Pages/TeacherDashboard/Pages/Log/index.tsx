import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../../api";

export default function StudentLog() {
  const { examId } = useParams<{ courseId: string; examId: string }>();

  const [logs, setLogs] = useState([]);
  const [examName, setExamName] = useState("");

  const history = useHistory();

  useEffect(() => {
    api({
      query: `query ($id: ID!) {
        logsByExam (id: $id) {
            id
            student {
                firstName
                lastName
            }
            exam {
                name
            }
            message
            createdAt
        }
    }`,
      variables: { id: examId },
    }).then((res: any) => {
      if (res !== null) {
        const logsByExam = res.data.data.logsByExam;
        console.log(logsByExam);
        if (logsByExam.length > 0) {
          setLogs(logsByExam);
          setExamName(logsByExam[0].exam.name);
        }
      } else {
        history.push("/");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row gap-4 p-4 relative min-h-screen">
      <div className="cursor-pointer" onClick={() => history.push("/dashboard")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </div>
      <div className="w-full">
        <h3 className="text-center font-bold text-5xl">{examName}</h3>
        <div className="mt-5 shadow-lg rounded-lg border-2 border-gray-100 overflow-y-auto">
          {logs.map((log: any) => (
            <p>
              [{log.createdAt}] {log.student.firstName} {log.student.lastName}{" "}
              action: {log.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
