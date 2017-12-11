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
		var name				= request.body.name;
		var age					= request.body.age;

		bcrypt.hash(password, saltRounds, function(err, hash) {
			if (err) {
				return console.log("Error hashing password, " + err);
			} else {
				let queryString = 'INSERT INTO users (date_added, password, email, name, age) VALUES (current_timestamp, ' + hash + ', ' + email + ', ' + name + ', ' + age + ')';
				console.log(queryString);
				client.query(queryString, (err, result) => {
					if (err) { 
						console.error('Error inserting: ' + err);
						resolve();
					}
					else { 
						request.session.email = email;
						console.log('success inserting!'); 
						resolve();
					}
					client.end();
				});
		
			}
		});

		/*client.query('SELECT * FROM posts LIMIT 50', (err, result) => {
			if (err)
				{ console.error(err); response.json("Error " + err); }
			else
				{ response.json(result.rows); }
			client.end();
		});*/
	});
};