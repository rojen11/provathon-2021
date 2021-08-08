require("dotenv").config();
const finalCurrentDate = require("./date");
const schdule = require("node-schedule");
const moment = require("moment");

//postgres setup begin
const { Pool } = require("pg");
const { on } = require("events");
const { BigIntStats } = require("fs");
// Load database info to connect
const pgUser = process.env.POSTGRES_USER;
const pgPass = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB;
const development = process.env.NODE_ENV == "development";
const serverLoc = development ? "localhost" : process.env.POSTGRES_HOST;

const connString =
  "tcp://" + pgUser + ":" + pgPass + "@" + serverLoc + ":5432/" + dbName; //username:password@location:port/dbname

//TODO: Try to connect to database
const pool = new Pool({
  connectionString: connString,
});
//Check if connection is good or bad
pool.connect((err) => {
  if (err) {
    console.log(pgUser);
    console.log(pgPass);
    console.log(dbName);
    console.error("Database connection error", err.stack);
  } else {
    console.log("Connected");
  }
});

//Postgres setup done
const io = require("socket.io")(
  development ? process.env.NODE_DEV_PORT : process.env.NODE_PORT,
  {
    cors: {
      origin: "*",
    },
    path: "/socket",
  }
);

//need to add start and end date from DB

var studentId =
  "Select * from courses_courseuser LEFT JOIN exams_exam ON (courses_courseuser.course_id = exams_exam.course_id) WHERE courses_courseuser.user_id = $1 AND exams_exam.id = $2;";
//database ma save garna
let startTime;
let endTime;

function calculateTimeLeft(currentDate, endTime_) {
  let x = moment(endTime_) - moment(currentDate);
  console.log(moment(endTime_));
  //return time left
  if (moment(endTime_).isSame(currentDate)) {
    console.log("Exam Ended");
  }

  let displayTime = moment.duration(x);
  let remaininghours = displayTime.hours();
  let remainingminutes = displayTime.minutes();
  let remainingseconds = displayTime.seconds();
  return `${remaininghours < 10 ? "0" : ""}${remaininghours}: ${
    remainingminutes < 10 ? "0" : ""
  }${remainingminutes}: ${
    remainingseconds < 10 ? "0" : ""
  }${remainingseconds} remaining`;
}

io.on("connection", (socket) => {
  let userID;

  console.log("Socket Connected");
  //calculate time left
  socket.on("exam-started", (examId, userId, isTeacher, startDate, endDate) => {
    userID = userId;
    console.log(isTeacher);
    if (isTeacher) {
      socket.join(`teachers-${examId}`);
      console.log("teacher has joined the room");
    } else {
      socket.join(`${userId}`);
      console.log(`${userId} has joined the class`);
    }
    console.log("EXAM HAS STARTED");

    startTime = startDate;
    endTime = endDate;
    let currentDate = finalCurrentDate.getDateTime();
    schdule.scheduleJob("exam", "*/1 * * * * *", () => {
      currentDate = finalCurrentDate.getDateTime();
      // console.log(calculateTimeLeft(currentDate, endTime));
    });
  });

  socket.on("ticket-open", (ticket_id, title, body, student_name, examId) => {
    console.log("TICKET OPENED!!!");
    socket
      .to(`teachers-${examId}`)
      .emit("ticket-open-teacher", ticket_id, title, body, student_name);
    console.log(`${student_name} sent the ticket to teacher`);
    console.log(examId);
    console.log(io.sockets.adapter.rooms);
  });

  //ticket reply ko lagi
  socket.on("ticket-reply", (reply, userID, ticketID, userName, isTeacher) => {
    //TODO: update the ticket query
    console.log("Ticket about to be replied!!!!");
    //if teacher send to students lobby
    //if student send to teacher lobby
    //know who is sending the message
  });

  //ticket close
  socket.on("ticket-closed", (ticketId, teacher_name, userId) => {
    console.log("Ticket about to be closed!!!!");
    socket
      .to(`${userId}`)
      .emit("ticket-closed-by-teacher", ticketId, teacher_name);
    console.log("CLOSEDDDD YOO!!!");
  });

  socket.on("log", (logger) => {
    const { userId, message, examId } = logger;

    if (userId !== null && message.event !== null && examId !== null) {
      pool.query(
        "INSERT into exams_studentlog (student_id, exam_id, message, created_at) VALUES ($1, $2, $3, $4);",
        [userId, examId, message.event, finalCurrentDate.dateTimeinDBFormat()],
        (err, row) => {
          console.log({ err, row });
        }
      );
    }
  });
});
