import { ActionType } from "../actions/types";
import { Action } from "./types";

export type Ticket = {
  id: string;
  title: string;
  body: string;
  closed: boolean;
  comments: any[];
  studentID: string;
};

type StateType = {
  tickets: Ticket[];
  current: any;
};

const initialState: StateType = {
  tickets: [],
  current: null,
};

export default function ticketReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.TICKET_ADD:
      return { ...state, tickets: [...state.tickets, action.payload.ticket] };

    case ActionType.TICKET_CLOSE:
      const newTickets = state.tickets.map((ticket: Ticket) => {
        if (ticket.id === action.payload.id) {
          ticket.closed = true;
        }
        return ticket;
      });
      return { ...state, tickets: [...newTickets] };

    case ActionType.TICKET_REPLY:
      const tickets = state.tickets.map((ticket) => {
        if (ticket.id === action.payload.id) {
          ticket.comments.push(action.payload.reply);
        }
        return ticket;
      });

      return { ...state, tickets: [...tickets] };

    default:
      return state;
  }
}
