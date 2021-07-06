import { store } from "./index";

export function getTicketByID(id) {
  for (var i = 0; i < store.getState().TicketReducer.tickets.length; i++) {
    if (store.getState().TicketReducer.tickets[i].id === id) {
      return i;
    }
  }
}
