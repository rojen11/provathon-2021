import { useEffect, useState } from "react";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import ExamPage from "../../components/ExamPage";
import TicketSystem from "../../components/TicketSystem";
import { useActions } from "../../../../store/useActions";
import { useParams } from "react-router-dom";
import { ipcRenderer } from "../../../../App";



export default function Exam() {
  const [show, setShow] = useState(true);

  const { logAction } = useActions();

  const { examId } = useParams<{ examId: string }>();

  useEffect(() => {
    // @ts-ignore
    if (window.desktop) {
      ipcRenderer.on("asynchronous-message", function (evt: any, message: any) {
        logAction({ message, examId });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col" style={{ height: "100vh" }}>
      <div className="px-5 py-2 h-16 shadow-md flex items-center text-4xl border-b-2 border-green-800">
        <div className="font-bold uppercase text-green-600">Exam Taker</div>
        <div className="flex-grow text-center">MATH 200 EXAM</div>
        <div className="font-bold">TIMER: 1:00</div>
      </div>
      <AnimateSharedLayout>
        <div className="flex h-full overflow-hidden">
          <ExamPage show={show} setShow={setShow} />
          <AnimatePresence initial={false}>
            {show && <TicketSystem />}
          </AnimatePresence>
        </div>
      </AnimateSharedLayout>
    </div>
  );
}
