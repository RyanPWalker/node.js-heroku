module.exports = (request, action) => {
	return new Promise(function(resolve,reject) {
		const { Client } = require('pg');
		const client = new Client({
		  connectionString: process.env.DATABASE_URL,
		  ssl: true,
		});
		client.connect();
        
        if (action == 'post') {
            var message = request.body.message;
            var user_id;
            console.log(message);

            email = request.session.email;

            let queryString = "SELECT user_id FROM users where email = '" + email + "'";
            client.query(queryString, (err, result) => {
                if (err) { 
                    console.error("Error " + err);
                    resolve();
                    return err;
                } else {
                    result.rows.forEach(function(r) {
                        user_id = r.user_id;
                    });

                    queryString = "INSERT INTO users (description, post_date, user_id) VALUES ('" + message + "', current_timestamp, '" + user_id + "')";
                    client.query(queryString, (err, result) => {
                        if (err) { 
                            console.error("Error " + err); resolve(); 
                        } else { 
                            console.log('Success inserting message');
                            resolve();
                        }
                        client.end();
                    });
                }
            });
        }
        
        if (action == 'get') {
            let queryString = "SELECT p.description, p.post_date, u.name FROM posts p JOIN users u ON u.user_id = p.user_id";
            client.query(queryString, (err, result) => {
                if (err) { 
                    console.error("Error " + err);
                    resolve();
                    return err;
                } else {
                    request.session.messages = result.rows;
                    console.log('Successfully pulled messages.');
                    resolve(result.rows);
                }
            });
        }
	});
};
