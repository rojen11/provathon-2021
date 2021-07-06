import Button from "../../Components/button";
import TicketCard from "./ticketcard";
import ItemButton from "../../Components/itemButton";
import { useState } from "react";
import { motion } from "framer-motion";
import { TicketOpened } from "./../../Socket/events";
import { connect } from "react-redux";
import * as ActionType from "../../Store/actionTypes";
import TicketMenu from "./ticketMenu";

function TicketSystem(props) {
  const [showTicket, setShowTicket] = useState(true);
  const [showComment, setShowComment] = useState({ show: false, selected: -1 });
  const [info, setInfo] = useState({ input: "", textarea: "" });
  function handleClick() {
    setShowTicket(!showTicket);
  }
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
            props.tickets.map((ticket, index) => (
              <TicketCard
                click={() =>
                  setShowComment({ show: true, selected: ticket.id })
                }
                key={ticket.id}
                id={ticket.id}
                title={ticket.title}
                body={ticket.body}
              />
            ))
          ) : (
            <TicketMenu
              id={showComment.selected}
              showCommentState={[showComment, setShowComment]}
            />
          )
        ) : (
          <TicketSubmit
            infoState={[info, setInfo]}
            showTicketSetter={setShowTicket}
          />
        )}
      </div>
      <div className="absolute bottom-0 p-5 m-auto w-full">
        {!showComment.show && (
          <Button
            click={() => {
              handleClick();
              if (
                showTicket === false &&
                info.input !== "" &&
                info.body !== ""
              ) {
                props.onAddTicket({
                  id: props.ticketID,
                  title: info.input,
                  body: info.textarea,
                  closed: false,
                  comments: [],
                });
                TicketOpened(
                  props.ticketID,
                  info.input,
                  info.textarea,
                  props.userID
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

function TicketSubmit(props) {
  return (
    <div className="mt-3">
      <input
        value={props.infoState[0].input}
        onChange={(e) =>
          props.infoState[1]({ ...props.infoState[0], input: e.target.value })
        }
        className="focus:outline-none rounded-lg ring-2 text-lg ring-black px-5 py-2 w-full"
        placeholder="Enter Title"
      />
      <textarea
        value={props.infoState[0].textarea}
        onChange={(e) =>
          props.infoState[1]({
            ...props.infoState[0],
            textarea: e.target.value,
          })
        }
        className="focus:outline-none mt-5 ring-2 ring-black px-5 py-2 w-full h-80 resize-none"
        placeholder="Enter Your Question or Confusion"
      />
      <div className="flex gap-x-40">
        <ItemButton
          click={() => props.infoState[1]({ input: "", textarea: "" })}
          name="Reset"
          p="mt-3"
        />
        <ItemButton
          click={() => props.showTicketSetter(true)}
          name="Close"
          p="mt-3"
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userID: state.AuthReducer.userID,
    tickets: state.TicketReducer.tickets,
    ticketID: state.TicketReducer.ticketID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadExams: (val) => dispatch({ type: ActionType.LOAD_EXAMS, exams: val }),
    onAddTicket: (val) =>
      dispatch({ type: ActionType.ADD_TICKET, ticket: val }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketSystem);
