function insert_student_marks(req,res,conn){
    let roll = req.body.s_roll;
    let ccode = req.body.course_code;
    let cname = req.body.course_name;
    let f_email = req.body.f_email;
    let batch = req.body.batch;
    let sec = req.body.sec;
    let dept = req.body.dept;
    let p1 = req.body.P1;
    let p2 = req.body.P2;

    conn.connect(function(err){
        conn.query("INSERT INTO iris_db.student_marks (s_roll,course_code,course_name,f_email,batch,sec,dept,P1,P2) VALUES (?,?,?,?,?,?,?,?,?)",[roll,ccode,cname,f_email,batch,sec,dept,p1,p2],function(error,rows,fields){
            console.log('Updated student marks for course: '+cname+'roll: '+roll);
            res.send({
                "message":"success"
            })
        })
    })

}

function download_student_marks_report(req,res,conn){
    let roll = req.body.s_roll;
    conn.connect(function(err) {
        // if(err) throw err
        //(0-CL, 1-OD, 2-ML, 3-Loss of Pay leave) (-1 if present)
        conn.query(`select * from iris_db.student_marks where s_roll=?;`, [roll], function(error, rows, fields) {
            // if(err) throw err
            console.log('leave data retrieved');
            let date = new Date(); // add date&tijme to file name
            res.xls('student_marks_report_'+date+'.xlsx', rows);
        })
    });
}
module.exports = {insert_student_marks,download_student_marks_report};

/**/