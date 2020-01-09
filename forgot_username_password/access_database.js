const mysql = require('mysql');

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

conn.connect(
	function (err) { 
	if (err) { 
		console.log("!!! Cannot connect !!! Error:");
		throw err;
	}
	else
	{
       console.log("Connection established.");
    //    generateotp();
    //    insertotp();
    //    sendemail();
    //    verifyotp();
	}	
});