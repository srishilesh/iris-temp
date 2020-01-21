var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var json2xls = require('json2xls');
const { BlobServiceClient } = require('@azure/storage-blob');
const uuidv1 = require('uuid/v1');
const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=irisbucket;AccountKey=SgZ4pBJMCHFgelVyaA/hKXcRlhTr0WYT/GkYaT6hIFqUNarHkrnc0/45Jz1SFn5NKdvas5ea9dlYZWycxKZAzQ==;EndpointSuffix=core.windows.net'
async function main() {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');
}
main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

var credentials = {
    host: "iris-se-database.mysql.database.azure.com",
    port: "3306",
    user: "iris_se@iris-se-database",
    password: "Soft20ware",
    database: 'iris_db', //database: "azureDB", (YOU MUST SPECIFY THE NAME OF THE DATABASE CREATED IN CLOUD, NOT THE NAME OF THE CONNECTION IN WORKBENCH)
    ssl: true //ssl=true (TYPO)
};

var conn = mysql.createConnection(credentials);
app.use(json2xls.middleware);
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    // res.send({
    //     "message": "good to go"
    // });
    res.sendFile("sample_attendance.html", { root: __dirname });
});


app.post('/email_faculty_summary',emailFacultySummary);

function emailFacultySummary(req, res) {

    var spawn = require("child_process").spawn;
    var toaddr = req.body.email; // NAME AND ID OF THE INPUT FIELD FOR THE EMAIL ADDRESS IS email
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
        conn.query('select leave_type, count(*) as cnt from emp_attendance where f_email=? group by leave_type order by leave_type ASC;', [email], function(error, rows, fields) {
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
    
    var date = new Date().toLocaleDateString();
    var time = new Date().toLocaleTimeString();
    //insertotp(toaddr, otp, date, time);
    var process = spawn('python', ["./faculty_attendance_summary_report_email.py", (toaddr), date, time,cl,od,ml,lp,present,absent,ml_remaining,cl_remaining]);
    process.stdout.on('data', function (data) {
        res.send({
            "message": "success"
        });
    })
    })
    console.log("Sending email ....")
});
};

app.post('/download_faculty_attendance_report', function(req, res) {
    let email = req.body.email;    

    conn.connect(function(err) {
        // if(err) throw err
        //(0-CL, 1-OD, 2-ML, 3-Loss of Pay leave) (-1 if present)
        conn.query('select * from emp_attendance where f_email=?;', [email], function(error, rows, fields) {
            // if(err) throw err
            console.log('leave data retrieved');
            let date = new Date(); // add date&tijme to file name
            res.xls('faculty_report-'+date+'.xlsx', rows);
        })
    });
});

app.post('/upload_faculty_attendance_report',function(req,res){
    let email = req.body.email;    
    const containerName = 'faculty-attendance-report';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    let date = new Date();
    const blobName = 'faculty_attendance_report_' + date + '.xlsx';
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    conn.connect(function(err) {
        // if(err) throw err
        //(0-CL, 1-OD, 2-ML, 3-Loss of Pay leave) (-1 if present)
        conn.query('select * from emp_attendance where f_email=?;', [email], function(error, rows, fields) {
            // if(err) throw err
            console.log('leave data retrieved');
             // add date&tijme to file name
            //res.xls('faculty_report-'+date+'.xlsx', rows);
            //data = JSON.stringify(rows)
            data = 'C:/Users/Srishilesh P S/Desktop/faculty_report-Mon Jan 13 2020 13_55_53 GMT+0530 (India Standard Time).xlsx'
            // data = new ArrayBuffer(rows)
            // var data = Utilities.newBlob(rows, 'application/octet-stream')
            const uploadBlobResponse = blockBlobClient.uploadFile(data);
            console.log("Blob was uploaded successfully.");
        })  
    });
    

})

app.listen(8081);