var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var session = require('express-session');
var dbhandler = require('./dbhandler.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var path = require ('path');
var fs = require('fs');

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

/************************************************/

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ secret: 'this-is-a-secret-token', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.use(logRequest);

// views is directory for all template files
app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/test', function(request, response) {
	response.render('pages/test');
});

app.post('/login', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	console.log(username, password);

   /*bcrypt.hash(password, saltRounds, function(err, hash) {
   	fs.writeFile("./testdb.txt", hash, function(err) {
   		if(err) {
   			return console.log(err);
   		}

   		console.log("The file was saved!");
   	}); 
   });*/

   var hash = fs.readFileSync("./testdb.txt").toString();
   console.log(hash);
   bcrypt.compare(password, hash, function(err, res) {
   	if (err) {
   		console.log(err);
   	} else {
   		console.log("Correct hash? : " + res);
   	}
	});

	request.session.username = username;

   console.log("Session variable: " + request.session.username);

	if (username) {
		response.json({"success": "true"});
		console.log('success');
	} else {
		response.json('error');
		console.log('error');
	}
});

app.post('/logout', function(request, response) {

	username = request.session.username;

	if (username) {
		request.session.destroy();
		console.log("Logging out: " + username);
		response.json({"success": "true"});
		console.log('success');
	} else {
		response.json({"success": "false"});
		console.log('error');
	}
});

app.get('/getServerTime', verifyLogin, function(request, response) {

	let time = Date.now();

	if (time) {
		response.json({"success": "true", "time": time});
		console.log('success');
	} else {
		response.json({"success": "false"});
		console.log('error');
	}
});

app.get('/goodturn', function(request, response) {
	response.render('pages/goodturn/index', {message: null});
});

app.post('/goodturn', function(request, response) {
	request.body.message == null ? {/* do nothing */} : {/* call dbhandler */};
	response.render('pages/goodturn/index', {message: request.body.message});
});

app.get('/goodturn/signin', function(request, response) {
	response.render('pages/goodturn/signin');
});

app.get('/goodturn/createprofile', function(request, response) {
	response.render('pages/goodturn/createprofile');
});

app.get('/goodturn/settings', function(request, response) {
	response.render('pages/goodturn/settings');
});

app.post('/goodturn/confirmation', function(request, response) {
	request.body.email == null ? {/* do nothing */} : {/* call dbhandler */};
	response.render('pages/goodturn/confirmation', {email: request.body.email});
});

app.get('/postal', function(request, response) {
	response.render('pages/postal');
});

app.post('/postalprice', function(request, response) {
	response.render('pages/postalprice', {weight: request.body.weight, type: request.body.type, answer: request.body.answer});
});

app.get('/movies', function(request, response) {
	response.render('pages/movies');
});

app.get('/db', function (request, response) {
	dbhandler(request);
});

app.get('/cool', function(request, response) {
	response.send(cool());
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);
	next();
}

function verifyLogin(request, response, next) {
	if (request.session.username) {
		// login verified
		next();
	} else {
		var result = {succes:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}