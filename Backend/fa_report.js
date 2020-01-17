function generate_fa_list(req, res, conn) {
    let email = req.body.email; //faculty email id
    let course_code = req.body.ccode;
    let dept = req.body.dept;
    let sec = req.body.section;
    let sem = req.body.semester;
    let batch = req.body.batch;

    const total_working_days = 2;
    const attendance_threshold = 0.5; //50 percent
  
    conn.connect(function(err) {
        conn.query(`select s_roll, count(*)/? as percent from student_attendance where f_email=? and course_code=? and department=? and section=? and semester=? and batch=?  and (attd_status='1' or attd_status='2') group by s_roll having percent<=?;`, [total_working_days, email, date, course_code, dept, sec, sem, batch, attendance_threshold], function(error, rows, fields) {
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
    conn.connect(function(err) {
        conn.query(`select s_roll, count(*)/? as percent from student_attendance where f_email=? and course_code=? and department=? and section=? and semester=? and batch=?  and (attd_status='1' or attd_status='2') group by s_roll having percent<=?;`, [total_working_days, email, date, course_code, dept, sec, sem, batch, attendance_threshold], function(error, rows, fields) {
            // if(err) throw err
            console.log('FA report data retrieved');
            let date = new Date(); // add date&tijme to file name
            res.xls('fa_report-'+date+'.xlsx', rows);
        })
    });
}
module.exports = {generate_fa_list}