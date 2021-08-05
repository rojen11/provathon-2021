import { connect } from "react-redux";
import ItemButton from "./../../Components/itemButton";
function TicketMenu(props) {
  function getTicketByID(id) {
    for (var i = 0; i < props.tickets.length; i++) {
      if (props.tickets[i].id === id) {
        return props.tickets[i];
      }
    }
  }

  return (
    <div>
      <div className="ring-2 ring-black rounded-lg">
        <div className="text-center text-xl border-b-2 border-black py-2">
          {getTicketByID(props.id).title}
        </div>
        <div className="text-lg py-3 px-2">{getTicketByID(props.id).body}</div>
      </div>
      <div className="mt-6">
        <Comment />
      </div>
      <div className="mt-10 absolute bottom-7 w-full left-0">
        <textarea
          className="focus:outline-none border-t-2 border-b-2 h-32 border-black px-5 py-2 w-full h-20 resize-none text-md"
          placeholder="Enter Your Question or Confusion"
        />
        <div className="flex justify-around">
          <ItemButton name="Send" p="mt-3 z-10" />
          <ItemButton
            click={() => props.showCommentState[1](false)}
            name="Back"
            p="mt-3 bg-green-300 hover:bg-green-400 z-10"
          />
        </div>
      </div>
    </div>
  );
}

function Comment() {
  return (
    <div className="bg-white rounded-lg p-5 shadow-lg filter drop-shadow-lg">
      <div className="text-xl">Hello This Question Is Right</div>
      <div className="text-sm text-gray-500 text-right pt-2">
        - Teacher Name
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tickets: state.TicketReducer.tickets,
  };
};

export default connect(mapStateToProps)(TicketMenu);
