var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var credentials = {
    host: "http://iris-aws-db.c4hq5iosxryf.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "#!Pascal1050ti",
    database: 'iris_db', //database: "azureDB", (YOU MUST SPECIFY THE NAME OF THE DATABASE CREATED IN CLOUD, NOT THE NAME OF THE CONNECTION IN WORKBENCH)
    ssl: true //ssl=true (TYPO)
};


var conn = mysql.createConnection(credentials);
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.send({
        "message": "good to go"
    });
});

app.post('/download_faculty_report',function(req,res) {
    let email = req.body.email;    
    
    if(ValidateEmail(email)===true)
    {
        conn.connect(function(err) {
            // if(err) throw err
            //(0-CL, 1-OD, 2-ML, 3-Loss of Pay leave) (-1 if present)
            conn.query('select * from emp_attendance where f_email=?;', [email], function(error, rows, fields) {
                // if(err) throw err
                console.log('leave data retrieved');
                // let date = new Date(); // add date&tijme to file name
                // res.xls('faculty_report-'+date+'.xlsx', rows);
                f = 1
                res.send({"message":"success"});
            })
            
        });
        //res.send({"message":"success"});
    }
    else{
        res.send({"message":"Invalid entry"});
    }
    

})

app.post('/download_student_report',function(req,res) {
    
    let email = req.body.email;
    let date = req.body.date; // mm/dd/yyyy
    let course_code = req.body.ccode;
    let dept = req.body.dept;
    let sec = req.body.section;
    let sem = req.body.semester;
    let batch = req.body.batch;
    if(ValidateEmail(email)===true)
    {
        conn.connect(function(err) {
            // if(err) throw err
            //(0-absent, 1-present, 2-OD)
            conn.query('select s_roll, department, section, semester, batch, c_date, c_period, attd_status, course_code from student_attendance where f_email=? and c_date=? and course_code=? and department=? and section=? and semester=? and batch=?;', [email, date, course_code, dept, sec, sem, batch], function(error, rows, fields) {
                // if(err) throw err
                console.log('student report data retrieved');
                // let date = new Date(); // add date&tijme to file name
                // res.xls('student_report-'+date+'.xlsx', rows);
                
                res.send({"message":"success"});
            })
            
        });
           // res.send({"message":"success"});
    }
    else{
        res.send({"message":"Invalid entry"});
    }

    
})


function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

let server = app.listen(8081, () => {
    console.log("Listening on port " + server.address().port + "...");
});

module.exports = server;