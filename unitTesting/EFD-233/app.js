var express = require('express');
var app = express();
// var mysql = require('mysql');
var bodyParser = require('body-parser');

// var credentials = {      
//     host: "iris-se-database.mysql.database.azure.com",
//     port: "3306",
//     user: "iris_se@iris-se-database",
//     password: "Soft20ware",
//     database: 'iris_db', //database: "azureDB", (YOU MUST SPECIFY THE NAME OF THE DATABASE CREATED IN CLOUD, NOT THE NAME OF THE CONNECTION IN WORKBENCH)
//     ssl: true //ssl=true (TYPO)
// };

// var conn = mysql.createConnection(credentials);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.send({
        "message": "good to go"
    });
});

//login 
app.post("/update_marks", function (req, res) { 
    // let roll = req.body.s_roll;
    // let ccode = req.body.course_code;
    // let cname = req.body.course_name;
    // let f_email = req.body.f_email;
    // let batch = req.body.batch;
    // let sec = req.body.sec;
    // let dept = req.body.dept;
    let p1 = req.body.P1;
    let p2 = req.body.P2;

    // conn.connect(function(err){
    if(p1>50|| p2>50 || p1<0 || p2<0) {
        res.send({
            "message":"Invalid marks"
        })
    }
    else{
        res.send({
            "message":"success"
        })
    }
    // })
})

let server = app.listen(8081, () => {
    console.log("Listening on port " + server.address().port + "...");
});

module.exports = server;