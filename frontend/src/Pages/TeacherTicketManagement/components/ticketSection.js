import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CloseTicket } from "./../../../Socket/events";

export default function TicketSection(props) {
  const { id, name, ticket } = props;

  return (
    <div className="relative rounded-lg shadow-xl min-h-full p-5 border border-gray-200">
      <section className="mt-4 rounded-lg shadow-xl p-4 border border-gray-200">
        <span className="font-bold">{name}</span>
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
        <span className="font-bold">{name}</span>
        <div className="p-3">
          <hr></hr>
          <TextField id="standard-basic" label="Reply" fullWidth={true} />
          <div className="text-right">
            <Button className="bg-green-500 hover:bg-green-600 mt-5 text-white text-right">
              Reply To Student
            </Button>
          </div>
        </div>
      </section>
      <Button
        onClick={() => CloseTicket(id, name)}
        className="absolute bottom-5 right-5 bg-red-500 text-white hover:bg-red-600"
      >
        Close Ticket
      </Button>
    </div>
  );
}

function Comment({ name, body }) {
  return (
    <section className="mt-4 rounded-lg shadow-xl p-4 border border-gray-200">
      <span className="font-bold">{name}</span>
      <div className="p-3">
        <hr></hr>
        <p className="p-2">{body}</p>
      </div>
    </section>
  );
}
