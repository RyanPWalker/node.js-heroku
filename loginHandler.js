import { json } from '../../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/express';

module.exports = (request) => {
	return new Promise(function(resolve,reject) {
		const { Client } = require('pg');
		const client = new Client({
		  connectionString: process.env.DATABASE_URL,
		  ssl: true,
		});
		client.connect();
		
		var bcrypt 				= require('bcrypt');
		const saltRounds 		= 10;
		var email 				= request.body.email;
		var password 			= request.body.password;
		var hashedPassword 	= null;
		console.log(email, password);

		request.session.email = email;

		let queryString = "SELECT password FROM users where email = '" + email + "'";
		client.query(queryString, (err, result) => {
			if (err) { 
				console.error("Error " + err); resolve(); 
			}
			else { 
				var jsonobject = JSON.stringify(result.rows);
				var hash = JSON.parse(jsonobject.password);
				console.log(jsonobject);
				console.log(hash);
				bcrypt.compare(password, hash, function(err, res) {
					if (err) {
						request.session.online = false;
						console.log("Error comparing database passwords, " + err);
						resolve();
					} else {
						console.log("Correct hash? : " + res);
						console.log(hash);
						request.session.online = res;
						resolve();
					}
				});
			}
			client.end();
		});
	});
};
