import { useState, useEffect } from "react";
import { Ticket } from "../../../../store/reducers/ticketReducer";
import NavTab from "../../components/NavTab";
import TeacherTicketCard from "../../components/TeacherTicketManagement";
import TicketSection from "../../components/TeacherTicketManagement/ticketSection";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useActions } from "../../../../store/useActions";
import { useParams, Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function TeacherTicketManagement(props: any) {
  const [selected, setSelected] = useState<Number | Ticket>(-1);

  const ticketState = useSelector((state: RootState) => state.ticket);
  const socketState = useSelector((state: RootState) => state.socket);

  const { connectSocket, initTicket, startExam } = useActions();

  const { courseId, examId } =
    useParams<{ courseId: string; examId: string }>();

  useEffect(() => {
    connectSocket();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socketState.connected) {
      initTicket();
      startExam(examId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketState.connected]);

  return (
    <div className="flex flex-row gap-4 p-3" style={{ height: "100vh" }}>
      <div className="bg-white h-full shadow-xl min-w-min w-1/4 relative">
        <div className="bg-white-300 p-5 text-left text-3xl uppercase bg-green-500 text-white font-bold rounded-t-lg">
          Ticket System
        </div>
        <NavTab />
        <div className="p-4">
          {ticketState.tickets.map((ticket: Ticket) => (
            <TeacherTicketCard
              key={ticket.id}
              click={() => setSelected(ticket)}
              selected={Number(ticket.id) === selected}
              title={ticket.title}
              body={ticket.body}
              name={ticket.studentID}
            />
          ))}
        </div>
        <div className="w-full bottom-0 absolute p-10">
          <Link
            to={`/dashboard/${courseId}/exams/${examId}/log`}
            className="w-full"
          >
            <Button
              onClick={() => {}}
              color="primary"
              fullWidth={true}
              variant="contained"
            >
              LOGS
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-grow">
        {selected !== -1 && (
          <TicketSection
            id={(selected as Ticket).id}
            ticket={selected as Ticket}
          />
        )}
      </div>
    </div>
  );
}
