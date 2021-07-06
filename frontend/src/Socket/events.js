import { io } from "socket.io-client";
import { store } from "../index";
import * as ActionType from "../Store/actionTypes";

let socket;
let examID;
let userID;

export function ConnectSocket(id) {
  socket = io("http://localhost:5000", { path: "/socket" });
  store.dispatch({ type: ActionType.SOCKET_STORE, socket: socket });
  examID = id;
  userID = store.getState().AuthReducer.userID;
  ExamStart(id);
  events();
}

export function ExamStart(examID) {
  socket.emit(
    "exam-started",
    examID,
    store.getState().AuthReducer.userID,
    store.getState().AuthReducer.isTeacher
  );
}

export function TicketOpened(ticketID, title, body, studentID) {
  socket
    .to(`teachers-${examID}`)
    .emit("ticket-open", ticketID, title, body, studentID, (res) => {
      console.log(res);
    });
  store.dispatch({
    type: ActionType.ADD_TICKET,
    ticket: {
      id: ticketID,
      title: title,
      body: body,
      closed: false,
      comments: [],
    },
  });
}

export function ReplyToTicket(reply, studentID, ticketID) {
  //
}

export function CloseTicket(ticketID, teacherName) {
  socket.to(`${userID}`).emit("ticket-closed", ticketID, teacherName);
  //store.dispatch({ type: ActionType.CLOSE_TICKET, id: ticketID });
}

export function events() {
  socket.on("ticket-open-teacher", (ticketID, title, body, studentID) => {
    console.log(ticketID, title, body, studentID);
    store.dispatch({
      type: ActionType.ADD_TICKET,
      ticket: {
        id: ticketID,
        title: title,
        body: body,
        closed: false,
        comments: [],
        studentID: studentID,
      },
    });
  });

  socket.on("ticket-closed-by-teacher", (ticketID, teacherName) => {
    console.log(ticketID, teacherName);
    //store.dispatch({ type: ActionType.CLOSE_TICKET, id: ticketID });
  });

  socket.on("ticket-reply", (ticketID, name, reply) => {
    console.log(ticketID, name, reply);
    store.dispatch({
      type: ActionType.REPLY_TICKET,
      id: ticketID,
      userName: name,
      comment: reply,
    });
  });
}

// Logger
export function sendLog(message) {
  console.log(message);
  if (socket != null) {
    socket.emit(
      "log",
      message
    );
  }
}
