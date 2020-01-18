function generate_fa_list(req, res, conn) {
  let email = req.body.email; //faculty email id
  let course_code = req.body.ccode;
  let dept = req.body.dept;
  let sec = req.body.section;
  let sem = req.body.semester;
  let batch = req.body.batch;

  const total_working_days = 2;
  const attendance_threshold = 0.5; //50 percent

  conn.connect(function (err) {
    conn.query(`select s_roll,course_code, count(*)/? as percent from student_attendance where f_email=? and course_code=? and department=? and section=? and semester=? and batch=?  and (attd_status='1' or attd_status='2') group by s_roll having percent<=?;`, [total_working_days, email, date, course_code, dept, sec, sem, batch, attendance_threshold], function (error, rows, fields) {
      // if(err) throw err
      console.log('FA report data retrieved');
      res.send(rows);
    })
  });
}

function download_fa_list(req, res, conn) {
  let email = req.body.email; //faculty email id
  let course_code = req.body.ccode;
  let dept = req.body.dept;
  let sec = req.body.section;
  let sem = req.body.semester;
  let batch = req.body.batch;

  const total_working_days = 2;
  const attendance_threshold = 0.5; //50 percent
  conn.connect(function (err) {
    conn.query(`select s_roll,course_code, count(*)/? as percent from student_attendance where f_email=? and course_code=? and department=? and section=? and semester=? and batch=?  and (attd_status='1' or attd_status='2') group by s_roll having percent<=?;`, [total_working_days, email, date, course_code, dept, sec, sem, batch, attendance_threshold], function (error, rows, fields) {
      // if(err) throw err
      console.log('FA report data retrieved');
      let date = new Date(); // add date&tijme to file name
      res.xls('fa_report-' + date + '.xlsx', rows);
    })
  });
}

function send_fa_report_email(req,res,conn){
  var spawn = require("child_process").spawn;
  var date = new Date().toLocaleDateString();
  var time = new Date().toLocaleTimeString();
  // let email = req.body.email; //faculty email id
  // let course_code = req.body.ccode;
  // let dept = req.body.dept;
  // let sec = req.body.section;
  // let sem = req.body.semester;
  // let batch = req.body.batch;
  let email="sanjay311999@gmail.com"
  let course_code="15cse381"
  let dept = "cse"
  let sec = "e"
  let sem = "6"
  let batch = "2017"

  const total_working_days = 2;
  const attendance_threshold = 0.5; //50 percent

  conn.connect(function (err) {
    conn.query("select s_roll, count(*)/? as percent from student_attendance where f_email=? and course_code=? and department=? and section=? and semester=? and batch=?  and (attd_status='1' or attd_status='2') group by s_roll having percent<=?;", [total_working_days, email, date, course_code, dept, sec, sem, batch, attendance_threshold], function (error, rows, fields) {
      // if(err) throw err
      console.log('FA report roll numbers retrieved');
      //res.send(rows);
      retrieve_parent_email(rows);
    })
    res.send({
      "message":"success"
    })
  });
  
}

function retrieve_parent_email(rows,conn){
  var email;
  
    for(var i=0;i<rows.length;i++)
    {
      roll = rows[i].s_roll;
      conn.query("SELECT parent_email from iris_db.student_details where s_roll=?",[roll],function(err,row,fields){
        var email = row;
        ccode = rows[i].ccode;
      sending_email_parent(email,ccode);
      });
      // mail = email[i].parent_email;
      
      })
      
    }

}

function sending_email_parent(email,ccode)
{
  var process = spawn('python', ["./fa_report_email.py",email,ccode]);
    process.stdout.on('data', function (data) {
        res.send({
            "message": "success"
        });
    })
    console.log("Sending email to "+roll)
    return
}
module.exports = {
  generate_fa_list,
  download_fa_list,
  send_fa_report_email
}
