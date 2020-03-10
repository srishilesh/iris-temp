//@ts-check
"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs')
var filename = 'data/todolist.txt';
//var fs = require(fs);
app.use(bodyParser.json());

/* BEGIN MY CODE */
var credentials = {
    host: "iris-aws-db.c4hq5iosxryf.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "#!Pascal1050ti",
    database: 'iris_db',
    ssl: true //ssl=true (TYPO)
};
// @ts-ignore
var conn = mysql.createConnection(credentials);

app.post("/login", function (req, res) {
    var user = req.body.email; //username - email id of faculty
    var pass = req.body.pswrd; //entered password
    var rem_chk = req.body.rem; //checkin remember or not
    var message = "";
    console.log("rem " + rem_chk)
    conn.connect(function (err) {
        conn.query("SELECT COUNT(*) AS cnt FROM iris_db.emp_login WHERE f_email='" + user + "'", function (error, rows, fields) {
            if (rows[0].cnt == 0) {
                message = "user name and password mismatch";
                res.send({
                    message: message
                });
            } else {
                conn.query("SELECT * FROM iris_db.emp_login", function (error, rows, fields) {
                    console.log("Connected " + user + " " + pass);
                    var length = rows.length;
                    console.log(length);

                    for (var i = 0; i < length; i++) {
                        if (rows[i].f_email === user) {
                            if (rows[i].f_remember === '1' || rows[i].f_pword === pass) {
                                console.log("herheh");
                                message = "success";
                                if (rem_chk === '1') { //value of remember checkbox is '1'
                                    conn.query("UPDATE iris_db.emp_login SET f_remember='1' WHERE f_email='" + user + "'", function (error, rows, fields) {
                                        console.log("Remember column updated");
                                    })
                                }
                            } else {
                                message = "failure";
                            }
                            break;
                        }
                    }
                    res.send({
                        message: message
                    });
                })
            }
        })
    });
})

app.post('/download_faculty_report', function (req, res) {
    var email = req.body.email;

    if (ValidateEmail(email) === true) {
        conn.connect(function (err) {
            conn.query('select * from emp_attendance where f_email=?;', [email], function (error, rows, fields) {
                console.log('leave data retrieved');
                var f = 1
                res.send({
                    message: "success"
                });
            })

        });
    } else {
        res.send({
            message: "Invalid entry"
        });
    }
})
app.post('/download_student_report', function (req, res) {

    var email = req.body.email;
    var date = req.body.date; // mm/dd/yyyy
    var course_code = req.body.ccode;
    var dept = req.body.dept;
    var sec = req.body.section;
    var sem = req.body.semester;
    var batch = req.body.batch;
    if (ValidateEmail(email) === true) {
        conn.connect(function (err) {
            conn.query('select s_roll, department, section, semester, batch, c_date, c_period, attd_status, course_code from student_attendance where f_email=? and c_date=? and course_code=? and department=? and section=? and semester=? and batch=?;', [email, date, course_code, dept, sec, sem, batch], function (error, rows, fields) {
                console.log('student report data retrieved');
                res.send({
                    "message": "success"
                });
            })

        });
    } else {
        res.send({
            message: "Invalid entry"
        });
    }
})

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

app.post('/update_marks', function (req, res) {
    var p1 = req.body.P1;
    var p2 = req.body.P2;

    if (p1 > 50 || p2 > 50 || p1 < 0 || p2 < 0) {
        res.send({
            message: 'Invalid marks'
        })
    } else {
        res.send({
            message: 'success'
        })
    }
})

/* END MY CODE */


app.get('/', function (req, res) {
    console.log('/: I received a GET request');
    var readFileCallback = function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'Error in reading the file'
            });
            return console.log(err);
        }
        console.log(data);
        res.status(200).send(data);
    };
    fs.readFile(filename, 'utf8', readFileCallback);
});
app.post('/', function (req, res) {
    console.log('/: I received a POST request');
    console.log(req.body);
    //res.end({url:'/'});

    var readFileCallback = function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'Error in reading the file'
            });
            return console.log(err);
        }
        console.log(data);
        data += '\n' + req.body.data;
        fs.writeFile(filename, data, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
            res.status(201).send(data);
            //res.json(data);
        });
    };
    //read file then write the post json data
    fs.readFile(filename, 'utf8', readFileCallback);
});

app.listen(3000);
console.log("Server running on port 3000: \n http://localhost:3000");