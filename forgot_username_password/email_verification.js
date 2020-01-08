var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
var mysql = require('mysql');

var config =
{
	host: 'iris-se-database.mysql.database.azure.com',
	user: 'iris_se@iris-se-database',
	password: 'Soft20ware',
	database: 'iris_db',
	port: 3306,
	ssl: true
};

const conn = new mysql.createConnection(config);

app.get("/", function(req, res) {
  //res.sendFile('__dirname','first.html');
  res.sendFile("forgot_pass.html", { root: __dirname });
});

app.post('/send', callName); 
  
function callName(req, res) { 
      
    // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
    var toaddr = req.body.email;                      // NAME AND ID OF THE INPUT FIELD FOR THE EMAIL ADDRESS IS email
    if(ValidateEmail(toaddr)==false)
    {
      return
    }
    var otp = generateOTP(5);
    var date = new Date().toLocaleDateString();
    var time = new Date().toLocaleTimeString();
    // var ip = req.body.ipadd;
    // console.log(req.query);
    //console.log(getIPAdd());
    insertotp(toaddr,otp,date,time);
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["./email_send.py",(toaddr),(otp),date,time] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
    console.log("Sending email ....")
} 

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    
    return (false)
}

function generateOTP(n) {
  var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

  if ( n > max ) {
          return generate(max) + generate(n - max);
  }

  max        = Math.pow(10, n+add);
  var min    = max/10; // Math.pow(10, n) basically
  var number = Math.floor( Math.random() * (max - min + 1) ) + min;

  return ("" + number).substring(add); 
}

function insertotp(email,otp,date,time)
{
  conn.connect(
    function (err) { 
    if (err) { 
      console.log("!!! Cannot connect !!! Error:");
      throw err;
    }
    else
    {
        console.log("Connection established.");
        conn.query('INSERT INTO iris_db.email_verification (f_email,acc_date,acc_time,otp) VALUES (?,?,?,?);',[email,date,time,otp],
        function (err, results, fields) {
          if (err) throw err;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
        });
    }	
  });
}

function getIPAdd()
{
  var getIP = require('ipware')().get_ip;
  app.use(function(req, res, next) {
      var ipInfo = getIP(req);
      console.log(ipInfo.clientIp);
      // { clientIp: '127.0.0.1', clientIpRoutable: false }
      next();
  });
  
  
}
app.listen(3001,function(){
  console.log("Listening")
})



// app.post('/send',function(req,res){
//   console.log("Hello")
//   //sendEmail()
//   // function sendEmail()
//   //       {

//     var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

//         Email.send({
//         Host : "smtp.gmail.com",
//         Username : "thehawkblack00@gmail.com",
//         Password : "phantom19",
//         To : "srishilesh@gmail.com",
//         From : "thehawkblack00@gmail.com",
//         Subject : "Testing for SE project",
//         Body : "Hello from smtpjs"
//         }).then(message => console.log("Sent successfully")
//         );
// })
