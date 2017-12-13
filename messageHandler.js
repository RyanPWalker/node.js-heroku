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

            for (let i = 0; i < message.length; i++) {
                if (message[i] === "'") {
                    message.substring(0, i) + "'" + message.substring(i, message.length);
                    console.log('slicing' + i);
                }
            }

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

                    console.log(user_id);

                    queryString = "INSERT INTO users (description, post_date, user_id) VALUES ('" + message + "', current_timestamp, '" + user_id + "')";
                    client.query(queryString, (err, result) => {
                        if (err) { 
                            console.error("Error inserting, " + err); reject(); 
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
