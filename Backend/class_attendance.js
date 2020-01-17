function download_class_attendance_report(req, res, conn) {
    let email = req.body.email;
    let date = req.body.date; // mm/dd/yyyy
    let course_code = req.body.ccode;
    let dept = req.body.dept;
    let sec = req.body.section;
    let sem = req.body.semester;
    let batch = req.body.batch;
    conn.connect(function(err) {
        // if(err) throw err
        //(0-absent, 1-present, 2-OD)
        conn.query(`select s_roll, department, section, semester, batch, c_date, c_period, attd_status, course_code from student_attendance where f_email=? and c_date=? and course_code=? and department=? and section=? and semester=? and batch=?;`, [email, date, course_code, dept, sec, sem, batch], function(error, rows, fields) {
            // if(err) throw err
            console.log('student report data retrieved');
            let date = new Date(); // add date&tijme to file name
            res.xls('student_report-'+date+'.xlsx', rows);
        })
    });
}

function calculate_free_student_leave(req, res, conn) {
    let email = req.body.email; //faculty email id
    let course_code = req.body.ccode;
    let dept = req.body.dept;
    let sec = req.body.section;
    let sem = req.body.semester;
    let batch = req.body.batch;

    const min_working_days = 20;
    const attendance_threshold = 0.5; //50 percent

    conn.connect(function (err) {
      conn.query(`select s_roll, ?-count(*) as cnt as percent from student_attendance where f_email=? and course_code=? and department=? and section=? and semester=? and batch=?  and (attd_status='1' or attd_status='2') group by s_roll;`, [min_working_days, email, date, course_code, dept, sec, sem, batch, attendance_threshold], function (error, rows, fields) {
        // if(err) throw err
        console.log('data retrieved');
        res.send(rows);
      })
    });
}

module.exports = {
    download_class_attendance_report,
    calculate_free_student_leave
}