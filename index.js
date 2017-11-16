var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

const { Pool } = require('pg');
var pool = new Pool();
pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
})

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index')
});

app.get('/postal', function(request, response) {
	response.render('pages/postal')
});

app.get('/db', function (request, response) {
	pool.connect((err, client, done) => {
		if (err) throw err;
		client.query('SELECT * FROM users', [1], (err, result) => {
			done();
			if (err)
				{ console.error(err); response.send("Error " + err); }
			else
				{ response.render('pages/db', {results: result.rows} ); }
		});
	});
});

app.get('/cool', function(request, response) {
	response.send(cool());
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});