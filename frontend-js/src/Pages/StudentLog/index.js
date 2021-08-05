import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosFunction from "../../Store/axiosFunction";

export default function StudentLog() {
  const { examid } = useParams();

  const [logs, setLogs] = useState([]);
  const [examName, setExamName] = useState("");

  const history = useHistory();

  useEffect(() => {
    AxiosFunction(`query {
        logsByExam (id: ${examid}) {
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
    }`).then((res) => {
      if (res !== null) {
        const logsByExam = res.data.data.logsByExam;
        console.log(logsByExam)
        if (logsByExam.length > 0) {
          setLogs(logsByExam);
          setExamName(logsByExam[0].exam.name)
        }
      } else {
        history.push("/");
      }
    });
  }, []);

  return (
    <div className="flex flex-row gap-4 p-4 relative min-h-screen">
      <div className="cursor-pointer" onClick={() => history.push("/")}>
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
          {logs.map((log) => (
            <p>
              [{log.createdAt}] {log.student.firstName} {log.student.lastName} action: {log.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
