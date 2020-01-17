function send_email_otp(req,res,conn){
    var spawn = require("child_process").spawn;
    var toaddr = req.body.email; // NAME AND ID OF THE INPUT FIELD FOR THE EMAIL ADDRESS IS email
    if (ValidateEmail(toaddr) == false) {
        return
    }
    var otp = generateOTP(5);
    var date = new Date().toLocaleDateString();
    var time = new Date().toLocaleTimeString();
    insertotp(conn,toaddr, otp, date, time);
    var process = spawn('python', ["./forgot_password_email_send.py", (toaddr), (otp), date, time]);
    process.stdout.on('data', function (data) {
        res.send({
            "message": "success"
        });
    })
    console.log("Sending email ....")
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

function generateOTP(n) {
    var add = 1,
        max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    if (n > max) {
        return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}

function insertotp(conn,email, otp, date, time) {
    conn.connect(
        function (err) {
            if (err) {
                console.log("!!! Cannot connect !!! Error:");
                throw err;
            } else {
                console.log("Connection established.");
                conn.query('INSERT INTO iris_db.email_verification (f_email,acc_date,acc_time,otp) VALUES (?,?,?,?);', [email, date, time, otp],
                    function (err, results, fields) {
                        if (err) throw err;
                        console.log('Inserted ' + results.affectedRows + ' row(s).');
                    });
            }
        });
}

function verifyotp(req,res,conn){
    let email = req.body.email_id; //useer email id
    let otp = req.body.otp; //otp
    let pass = req.body.new_pass; //new passowrd
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let message = "";
    conn.connect(function (err) {
        conn.query("SELECT otp FROM iris_db.email_verification WHERE f_email=? AND acc_date=? ORDER BY acc_time DESC;", [email, date], function (error, rows, fields) {
            // console.log("Connected " + user + " " + pass);
            if(otp == rows[0].otp) {
                console.log('OTP match success');
                register(req,res,conn);
            }
            else {
                console.log('Wrong OTP');
                message = 'failure';
                res.send({"message": message});
            }
        })
    });
}

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



module.exports = {send_email_otp,verifyotp}