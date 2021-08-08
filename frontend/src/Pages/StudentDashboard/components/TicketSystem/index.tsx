import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useActions } from "../../../../store/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import TicketCard from "../TicketCard";
import TicketMenu from "../TicketMenu";
import TicketSubmit from "../TicketSubmit";
import TicketButton from "./button";
import { useParams } from "react-router-dom";

export default function TicketSystem() {
  const [showTicket, setShowTicket] = useState(true);
  const [showComment, setShowComment] = useState({
    show: false,
    selected: { id: "-1", body: "", title: "", comments: [] },
  });
  const [info, setInfo] = useState({ input: "", textarea: "" });

  const { initTicket, ticketOpen, connectSocket, startExam } = useActions();
  const ticketState = useSelector((state: RootState) => state.ticket);
  const socketState = useSelector((state: RootState) => state.socket);

  const { examId } = useParams<{ examId: string }>();

  function handleClick() {
    setShowTicket(!showTicket);
  }

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
    <motion.div
      key="1"
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ duration: 0.2 }}
      className="relative w-96 border-l-2 border-green-800 shadow-lg"
    >
      <div className="p-5">
        {showTicket ? (
          !showComment.show ? (
            ticketState.tickets.map((ticket, index) => (
              <TicketCard
                handleClick={() =>
                  setShowComment({ show: true, selected: { ...ticket } })
                }
                key={ticket.id}
                title={ticket.title}
                body={ticket.body}
              />
            ))
          ) : (
            <TicketMenu
              body={showComment.selected.body}
              comments={showComment.selected.comments}
              title={showComment.selected.title}
              handleClick={(comment: string) => {
                setShowComment({ ...showComment, show: !showComment.show });
              }}
            />
          )
        ) : (
          <TicketSubmit
            info={info}
            setInfo={setInfo}
            handleClose={() => setShowTicket(false)}
          />
        )}
      </div>
      <div className="absolute bottom-0 p-5 m-auto w-full">
        {!showComment.show && (
          <TicketButton
            click={() => {
              handleClick();
              if (
                showTicket === false &&
                info.input !== "" &&
                info.textarea !== ""
              ) {
                ticketOpen(
                  ticketState.tickets.length,
                  info.input,
                  info.textarea,
                  examId
                );
              }
            }}
            width="100%"
            height="4rem"
            color={showTicket ? "green" : "blue"}
            name={showTicket ? "Ticket" : "Submit"}
            icon={
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            }
          />
        )}
      </div>
    </motion.div>
  );
}

//
