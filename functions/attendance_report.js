var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var credentials = {
    host: "iris-se-database.mysql.database.azure.com",
    port: "3306",
    user: "iris_se@iris-se-database",
    password: "Soft20ware",
    database: 'iris_db', //database: "azureDB", (YOU MUST SPECIFY THE NAME OF THE DATABASE CREATED IN CLOUD, NOT THE NAME OF THE CONNECTION IN WORKBENCH)
    ssl: true //ssl=true (TYPO)
};

var conn = mysql.createConnection(credentials);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    // res.send({
    //     "message": "good to go"
    // });
    res.sendFile("sample_attendance.html", { root: __dirname });
});


app.post('/email_faculty_summary',emailFacultySummary);

function emailFacultySummary(req, res) {

    var spawn = require("child_process").spawn;
    var toaddr = req.body.email; // NAME AND ID OF THE INPUT FIELD FOR THE EMAIL ADDRESS IS email
    let email = req.body.email;
    let absent;
    let present;
    let ml;
    let cl;
    let od;
    let lp;

    let ml_remaining; //remaining medical leave
    let cl_remaining; //remaining casual leave

    const MEDICAL_LEAVE = 5;
    const CASUAL_LEAVE = 6;
    

    conn.connect(function(err) {
        // if(err) throw err
        //(0-CL, 1-OD, 2-ML, 3-Loss of Pay leave) (-1 if present)
        conn.query('select leave_type, count(*) as cnt from emp_attendance where f_email=? group by leave_type order by leave_type ASC;', [email], function(error, rows, fields) {
            // if(err) throw err
            console.log('leave data retrieved');
            cl = rows[1].cnt; //casual leave count
            od = rows[2].cnt; //OD count
            ml = rows[3].cnt; //medical leave count
            lp = rows[4].cnt; //loss of pay leave count
            present = rows[0].cnt+od; //present days count (including OD)
            absent = cl+od+ml; //total absent count
            let tot_work = present+absent-od;
            ml_remaining = MEDICAL_LEAVE-ml;
            cl_remaining = CASUAL_LEAVE-cl;
    
    var date = new Date().toLocaleDateString();
    var time = new Date().toLocaleTimeString();
    //insertotp(toaddr, otp, date, time);
    var process = spawn('python', ["./faculty_attendance_summary_report_email.py", (toaddr), date, time,cl,od,ml,lp,present,absent,ml_remaining,cl_remaining]);
    process.stdout.on('data', function (data) {
        res.send({
            "message": "success"
        });
    })
    })
    console.log("Sending email ....")
});
};





app.listen(8081);