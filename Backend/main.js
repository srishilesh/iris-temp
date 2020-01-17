var forgotpassword = require('./forgot_password.js')
var login = require('./login.js')
var register = require('./register.js')
var fa_report = require('./fa_report')

var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var json2xls = require('json2xls');


const {
  BlobServiceClient
} = require('@azure/storage-blob');
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
  res.sendFile("sample_attendance.html", {
    root: __dirname
  });
});


//login page handling with remember me
app.post("/login", function (req, res) {
  login.login(req, res, conn);
})

//new user registration
app.post('/register', function (req, res) {
  register.register(req, res, conn);
})

// Forgot password, sending OTP email and insertion into the database
app.post('/forgotpassword', function (req, res) {
  forgotpassword.send_email_otp(req, res, conn);

});

//verify OTP and reset new password
app.post('/verifyotp', function (req, res) {
  forgotpassword.verifyotp(req, res, conn);
})

app.post('/generate_fa_list', function(req, res) {
	fa_report.generate_fa_list(req, res, conn);
})

app.post('/download_fa_list', function(req, res) {
	fa_report.download_fa_list(req, res, conn);
})


let server = app.listen(8081, () => {
  console.log("Listening on port " + server.address().port + "...");
});
