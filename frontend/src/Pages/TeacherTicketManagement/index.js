import TeacherTicketCard from "./components/teacherTicketCard";
import NavTab from "./components/navTab";
import TicketSection from "./components/ticketSection";
import { connect } from "react-redux";
import { useState } from "react";
import { getTicketByID } from "./../../helperFunctions";

function TeacherTicketManagement(props) {
  const [selected, setSelected] = useState(-1);
  return (
    <div className="flex flex-row gap-4 p-3" style={{ height: "100vh" }}>
      <div className="bg-white h-full shadow-xl min-w-min w-1/4">
        <div className="bg-white-300 p-5 text-left text-3xl uppercase bg-green-500 text-white font-bold rounded-t-lg">
          Ticket System
        </div>
        <NavTab />
        <div className="p-4">
          {props.tickets.map((ticket) => (
            <TeacherTicketCard
              onClick={() => setSelected(ticket.id)}
              selected={ticket.id === selected}
              title={ticket.title}
              body={ticket.body}
            />
          ))}
        </div>
      </div>
      <div className="flex-grow">
        {selected !== -1 && (
          <TicketSection
            id={selected}
            ticket={getTicketByID(selected)}
            name={props.firstName + " " + props.secondName}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tickets: state.TicketReducer.tickets,
    firstName: state.AuthReducer.firstName,
    lastName: state.AuthReducer.lastName,
  };
};

export default connect(mapStateToProps)(TeacherTicketManagement);
