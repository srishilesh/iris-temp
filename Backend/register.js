function register(req,res,conn){
    let froll = req.body.froll;
    let fname = req.body.fname;
    let fdob = req.body.fdob;
    let femail = req.body.femail;
    let fphone = req.body.fphone;
    let faddr = req.body.faddr;
    let fdoj = req.body.fdoj;
    let fgender = req.body.fgender;
    let flname = req.body.flname;
    let fpass = req.body.fpass;
    let message = "";
    // const userExists = prisma.$exists.user({f_roll:roll})
    conn.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query('SELECT * FROM iris_db.emp_details WHERE f_email=?;', [femail], function (err, rows, fields) {
            if (err) throw err;
            if (rows.length == 0) { //user doesnt exist 
                con.query("INSERT INTO iris_db.emp_details (f_roll, f_fname,f_dob,f_email,f_phone,f_address, f_doj, f_gender, f_lname, f_password) VALUES (?,?,?,?,?,?)", [froll, fname, fdob, femail, fphone, faddr, fdoj, fgender, flname, fpass], function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    message = "success";
                    res.send({
                        "message": message
                    });
                });
            } else {
                message = "user already exists"; //user already exits
                res.send({
                    "message": message
                });
            }
        })
    });
}

module.exports = {register}