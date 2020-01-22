function login(req,res,conn){

    let user = req.body.email; //username - email id of faculty
    let pass = req.body.pswrd; //entered password
    let rem_chk = req.body.rem; //checkin remember or not
    let message = "";
    console.log("rem "+rem_chk)
    conn.connect(function (err) {
        conn.query("SELECT COUNT(*) AS cnt FROM iris_db.emp_login WHERE f_email='" + user + "'", function(error, rows, fields) {
            if(rows[0].cnt == 0) {
                message = "user name and password mismatch";
                res.send({
                    "message": message
                });
            }
            else {
                conn.query("SELECT * FROM iris_db.emp_login", function (error, rows, fields) {
                    console.log("Connected " + user + " " + pass);
                    let length = rows.length;
                    console.log(length);
        
                    for (i = 0; i < length; i++) {
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
                        "message": message
                    });
                })
            }
        })
    });
}

module.exports = {login}