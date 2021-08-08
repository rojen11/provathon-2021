import { RootState } from "..";
import { ActionType } from "./types";

export const initTicket = () => {
  return (dispatch: Function, getState: () => RootState) => {
    const { socket } = getState().socket;


    socket.on(
      "ticket-open-teacher",
      (ticketID: any, title: any, body: any, studentID: any) => {
        dispatch({
          type: ActionType.TICKET_ADD,
          payload: {
            ticket: {
              id: ticketID,
              title,
              body,
              closed: false,
              comments: [],
              studentID,
            },
          },
        });
      }
    );

    socket.on("ticket-closed-by-teacher", (ticketID: any, teacherName: any) => {
      dispatch({ type: ActionType.TICKET_CLOSE, payload: { id: ticketID } });
    });

    socket.on("ticket-reply", (ticketID: any, name: any, reply: any) => {
      dispatch({
        type: ActionType.TICKET_REPLY,
        payload: {
          id: ticketID,
          name,
          reply,
        },
      });
    });
  };
};


export const ticketOpen = (
  ticketID: any,
  title: any,
  body: any,
  examID: any
) => {
  return (dispatch: Function, getState: () => RootState) => {
    const { socket } = getState().socket;
    socket.emit(
      "ticket-open",
      ticketID,
      title,
      body,
      getState().auth.user.pk,
      examID
    );
    dispatch({
      type: ActionType.TICKET_ADD,
      payload: {
        ticket: { id: ticketID, title, body, closed: false, comments: [] },
      },
    });
  };
};
