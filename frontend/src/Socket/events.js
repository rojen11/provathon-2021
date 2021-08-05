import { io } from "socket.io-client";
import { store } from "../index";
import * as ActionType from "../Store/actionTypes";

let socket;
let examID;
let userID;

export function ConnectSocket(id) {
  socket = io("http://localhost", { path: "/socket" });
  store.dispatch({ type: ActionType.SOCKET_STORE, socket: socket });
  examID = id;
  userID = store.getState().AuthReducer.userID;
  ExamStart(id);
  events();
}

function getExamByID(id) {
  for (var i = 0; i < store.getState().ExamReducer.exams.length; i++) {
    if (store.getState().ExamReducer.exams[i].id === id) {
      return store.getState().ExamReducer.exams[i];
    }
  }
}

export function ExamStart(examID) {
  socket.emit(
    "exam-started",
    examID,
    store.getState().AuthReducer.userID,
    store.getState().AuthReducer.isTeacher,
    getExamByID(examID).startTime,
    getExamByID(examID).endTime
  );
}

export function TicketOpened(ticketID, title, body, studentID) {
  socket.emit("ticket-open", ticketID, title, body, studentID, examID);
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

export function ReplyToTicket(reply, userID, ticketID, userName, isTeacher) {
  socket.emit("ticket-reply", reply, userID, ticketID, userName, isTeacher);
}

export function CloseTicket(ticketID, teacherName) {
  socket.emit("ticket-closed", ticketID, teacherName, userID);
  store.dispatch({ type: ActionType.CLOSE_TICKET, id: ticketID });
}

export function events() {
  socket.on("ticket-open-teacher", (ticketID, title, body, studentID) => {
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
    store.dispatch({ type: ActionType.CLOSE_TICKET, id: ticketID });
  });

  socket.on("ticket-reply", (ticketID, name, reply) => {
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
  if (socket != null) {
    socket.emit("log", {
      userId: userID,
      message: message,
      examId: examID,
    });
  }
}
