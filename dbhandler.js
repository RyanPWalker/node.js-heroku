module.exports = (request) => {

	var params = url.parse(request.url, true);
	var action = params.query.action;
	console.log(action);

	if (action = 'selectmessages') {
		client.query('SELECT * FROM posts LIMIT 50', (err, result) => {
			if (err)
				{ console.error(err); response.json("Error " + err); }
			else
				{ response.json(result.rows); }
			client.end();
		});
	}
};