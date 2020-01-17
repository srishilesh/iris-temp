function check_balance_leave(req, res, conn) {
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
        conn.query(`select leave_type, count(*) as cnt from emp_attendance where f_email=? group by leave_type order by leave_type ASC;`, [email], function(error, rows, fields) {
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

            let response = {
                "message": "success",
                "total working days": tot_work,
                "present count": present,
                "absent count": absent,
                "ml used": ml,
                "cl used": cl,
                "od used": od,
                "lp used": lp,
                "ml remaining": ml_remaining,
                "cl remaining": cl_remaining
            };
            res.send(response);
        })
    });
}

function email_faculty_summary(req, res, conn) {

}

function download_faculty_attendance_report(req, res, conn) {

}

module.exports = {
    check_balance_leave,
    email_faculty_summary,
    download_faculty_attendance_report
}