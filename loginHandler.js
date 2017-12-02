module.exports = (request) => {
	return new Promise(function(resolve,reject) {
		var fs 					= require('fs');
		var bcrypt 				= require('bcrypt');
		const saltRounds 		= 10;
		var email 				= request.body.email;
		var password 			= request.body.password;
		var hashedPassword 	= null;
		console.log(email, password);

		request.session.email = email;

		// we need this for signing up, not logging in
		/*bcrypt.hash(password, saltRounds, function(err, hash) {
			if (err) {
				return console.log("Error hashing password, " + err);
			} else {
		   	fs.writeFile("./testdb.txt", hash, function(err) {
		   		if(err) {
		   			return console.log(err);
		   		}

		   		console.log("The file was saved!");
		   	});
	   		hashedPassword = hash;
	   	}
	   });*/

		var compareHash = fs.readFileSync("./testdb.txt").toString();
	   console.log(compareHash);
	   bcrypt.compare(password, compareHash, function(err, res) {
	   	if (err) {
	   		request.session.online = false;
	   		console.log("Error comparing database passwords, " + err);
	   		resolve();
	   	} else {
	   		console.log("Correct hash? : " + res);
	   		request.session.online = res;
	   		resolve();
	   	}
		});
	});
};
