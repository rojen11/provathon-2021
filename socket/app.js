require('dotenv').config();
const finalCurrentDate = require('./date');
const schdule = require('node-schedule');
const moment = require("moment");

//postgres setup begin
const { Pool } = require('pg');
const { on } = require('events');
const { BigIntStats } = require('fs');
// Load database info to connect
const pgUser = process.env.POSTGRES_USER;
const pgPass = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB;
const development = process.env.NODE_ENV == 'development'
const serverLoc = development ? 'localhost' : process.env.POSTGRES_HOST;

const connString = 'tcp://' + pgUser + ':' + pgPass + '@' + serverLoc + ':5432/' + dbName; //username:password@location:port/dbname

//TODO: Try to connect to database
const pool = new Pool({
    connectionString: connString
});
//Check if connection is good or bad
pool.connect(err => {
    if (err) {
        console.log(pgUser)
        console.log(pgPass)
        console.log(dbName)
        console.error('Database connection error', err.stack);
    }
    else {
        console.log('Connected');
    }
})

//Postgres setup done
const io = require("socket.io")(development ? process.env.NODE_DEV_PORT : process.env.NODE_PORT, {
    cors: {
        origin: "*",
    },
    path: '/socket'
});

// at a particular date and time
// let startDate = new Date().toString()
// schdule.scheduleJob(
//   startDate, () => {
//     console.log("The exam starts at", Date().toString())
//   }
// )  

//need to add start and end date from DB


var studentId = 'Select * from courses_courseuser LEFT JOIN exams_exam ON (courses_courseuser.course_id = exams_exam.course_id) WHERE courses_courseuser.user_id = $1 AND exams_exam.id = $2;'
//database ma save garna 
let startTime;
let endTime;

function calculateTimeLeft(currentDate, endTime_) {
    let x = moment(endTime_) - moment(currentDate);
    console.log(moment(endTime_))
    //return time left
    if (moment(endTime_).isSame(currentDate)) {
        console.log("Exam Ended");
    }

    let displayTime = moment.duration(x);
    let remaininghours = displayTime.hours();
    let remainingminutes = displayTime.minutes();
    let remainingseconds = displayTime.seconds();
    return `${remaininghours < 10 ? '0' : ''}${remaininghours}: ${remainingminutes < 10 ? '0' : ''}${remainingminutes}: ${remainingseconds < 10 ? '0' : ''}${remainingseconds} remaining`;
}


io.on("connection", (socket) => {
    let examID;
    console.log("Socket Connected");
    //calculate time left
    socket.on("exam-started", (examId, userId, isTeacher) => {
        if (isTeacher) {
            socket.join(`teachers-${examId}`)
        } else {
            socket.join(`${userId}`)
        }
        console.log("EXAM HAS STARTED")
        pool.query('SELECT start_time, end_time, id FROM exams_exam WHERE id=$1;', [examId], (err, rows, fields) => {
            console.log(rows.length)
            examID = examId;

            if (rows.rows.length === 1) {
                const row0 = rows.rows[0]
                startTime = row0.start_time;
                endTime = row0.end_time;
                let currentDate = finalCurrentDate.getDateTime();
                schdule.scheduleJob("exam", '*/1 * * * * *', () => {
                    // console.log("I ran.....")
                    currentDate = finalCurrentDate.getDateTime();
                    console.log(`Current Date: ${currentDate}`);
                    console.log(calculateTimeLeft(currentDate, endTime));
                })
            }
        })
    })


    socket.on("ticket-open", (ticket_id, title, body, student_name) => {
        console.log("TICKET OPENED!!!")
        socket.to(`teachers-${examID}`).emit('ticket-open-teacher', ticket_id, title, body, student_name);
        // pool.query(studentId, [student_name, examID], function (err, rows, fields) {
        //     if (rows.rows.length === 1) {
        //         if (title != null && body != null) {
        //             pool.query('INSERT INTO exams_tickets (title, description, exam_id, student_id, resolved, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7);'
        //                 , [title, body, examID, student, false, finalCurrentDate.dateTimeinDBFormat(), finalCurrentDate.dateTimeinDBFormat()], (err, res) => {
        //                     if (err) {
        //                         // socket.emit("ticket-open-unsuccesfull");
        //                         console.log(title)
        //                         console.log(body)
        //                         callback({ success: false })
        //                         throw (err)
        //                     }
        //                     else {
        //                         // socket.emit("ticket-open-succesfull");
        //                         callback({ success: true })
        //                     }
        //                 })
        //         }
        //         else {
        //             //bhaena bhane => student chaina bhane, title body empty, exam start bhako chaina bhane, timeleft chaina bhane
        //             // socket.emit("ticket-open-unsuccesfull");
        //             callback({ success: false })
        //         }
        //     }
        // });
    })

    //ticket reply ko lagi
    // socket.on("ticket-reply", (ticketId, ticketNewTitle, ticketIdNewBody, student, callback) => {
    //   //TODO: update the ticket query
    //   // if (ticket is on and ticket is not resolved and ticket in database) {
    //   //   ticket modifiable; 
    //   // } else {
    //   //   not modifiable;
    //   // }
    // })


    //ticket close
    socket.on("ticket-closed", (ticketId, teacher_name) => {
        console.log("Ticket about to be closed!!!!")
        socket.to(`${userId}`).emit("ticket-closed-by-teacher", ticketId, teacher_name);
        //TODO: close the ticket query
        // pool.query('SELECT exams_tickets.id, users_user.is_teacher from exams_tickets LEFT JOIN exams_exam ON (exams_exam.id = exams_tickets.exam_id) LEFT JOIN courses_course ON (courses_course.id = exams_exam.course_id) LEFT JOIN users_user ON (users_user.id = courses_course.primary_teacher_id) WHERE exams_tickets.id=$1 and exams_exam.id = $2 and courses_course.primary_teacher_id = $3;'
        //     , [7, 3, 4], (err, res) => {
        //         console.log(res);
        //         if (res.row.length === 1) {
        //             //ticket can be closed by teacher
        //             callback({ success: true })
        //         }
        //         else {
        //             //ticket cannot be closed cause error bhayo  
        //             callback({ success: false })
        //             throw (err)
        //         }
        //     })
    });
});



