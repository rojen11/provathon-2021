import * as ActionType from "../Store/actionTypes";

const initState = {
  tickets: [],
  ticketID: 1,
};

const ticketReducer = (state = initState, action) => {
  let modifyState = { ...state };

  function getTicketByID(id) {
    for (var i = 0; i < modifyState.tickets.length; i++) {
      if (modifyState.tickets[i].id === id) {
        return i;
      }
    }
  }

  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionType.ADD_TICKET:
      console.log(action)
      modifyState.tickets.push(action.ticket);
      modifyState.ticketID++;
      return modifyState;
    case ActionType.CLOSE_TICKET:
      modifyState.tickets[getTicketByID(action.id)].close = true;
      return modifyState;
    case ActionType.REPLY_TICKET:
      modifyState.tickets[getTicketByID(action.id)].comments.push({
        comment: action.comment,
        userName: action.name,
      });
      return modifyState;
  }

  return state;
};

export default ticketReducer;
