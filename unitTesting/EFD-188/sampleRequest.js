var Request = require('request');

var data = {};
var input = {
    "email": "abcxyz@gmail.com",
    "pswrd": "qwe123",
    "rem": "0"
}
Request.post("http://localhost:8081/login", {
    form: input
}, (error, response, body) => {
    data.body = JSON.parse(body);
    console.log(data.body.message);
});