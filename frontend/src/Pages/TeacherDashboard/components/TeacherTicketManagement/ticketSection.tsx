import { TextField } from "@material-ui/core";
import { useState } from "react";
import { Ticket } from "../../../../store/reducers/ticketReducer";
import { Button } from "@material-ui/core";
import Comment from "./comment";

type Props = {
  id: string;
  ticket: Ticket;
  firstName?: string;
};

export default function TicketSection(props: Props) {
  const [input, setInput] = useState("");

  const { ticket } = props;
  return (
    <div className="relative rounded-lg shadow-xl min-h-full p-5 border border-gray-200">
      <section className="mt-4 rounded-lg shadow-xl p-4 border border-gray-200">
        <span className="font-bold">{props.firstName}</span>
        <div className="p-3">
          <div className="text-xl p-2">{ticket.title}</div>
          <hr></hr>
          <p className="p-2">{ticket.body}</p>
        </div>
      </section>
      {ticket.comments.map((comment) => (
        <Comment name={comment.name} body={comment.body} />
      ))}
      <section className="mt-4 rounded-lg shadow-xl p-4 border border-gray-200">
        <span className="font-bold">{props.firstName}</span>
        <div className="p-3">
          <hr></hr>
          <TextField
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
            id="standard-basic"
            label="Reply"
            fullWidth={true}
          />
          <div className="text-right">
            <Button
              onClick={() => {}}
              className="bg-green-500 hover:bg-green-600 mt-5 text-white text-right"
            >
              Reply To Student
            </Button>
          </div>
        </div>
      </section>
      <Button
        onClick={() => {}}
        className="absolute bottom-5 right-5 bg-red-500 text-white hover:bg-red-600"
      >
        Close Ticket
      </Button>
    </div>
  );
}
