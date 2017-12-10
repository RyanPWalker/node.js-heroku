module.exports = (request) => {

	var bcrypt 				= require('bcrypt');
	const saltRounds 		= 10;
	var email 				= request.body.email;
	var password 			= request.body.password;
	var name				= request.body.name;
	var age					= request.body.age;
	console.log(email + password + name + age);

	client.query('INSERT INTO users ()', (err, result) => {
		if (err)
			{ console.error(err); response.json("Error " + err); }
		else
			{ response.json(result.rows); }
		client.end();
	});

	/*client.query('SELECT * FROM posts LIMIT 50', (err, result) => {
		if (err)
			{ console.error(err); response.json("Error " + err); }
		else
			{ response.json(result.rows); }
		client.end();
	});*/
};