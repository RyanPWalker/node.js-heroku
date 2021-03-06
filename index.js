var cool 			= require('cool-ascii-faces');
var express 		= require('express');
var app 			= express();
var session 		= require('express-session');
var createhandler 	= require('./createhandler.js');
var loginHandler 	= require('./loginHandler.js');
var messageHandler  = require('./messageHandler.js');
var path 			= require ('path');

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
//app.use(storeLocation);

// views is directory for all template files
app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/about', function(request, response) {
	response.render('pages/about');
});

app.get('/ryan', function(request, response) {
	response.render('pages/ryan');
});

app.get('/fhe', function(request, response) {
	response.render('pages/fhe');
});

app.get('/dance', function(request, response) {
	response.render('pages/danceFloor');
});

app.get('/games', function(request, response) {
	response.render('pages/games/');
});

app.get('/games/dots', function(request, response) {
	response.render('pages/games/dots');
});

app.get('/postal', function(request, response) {
	response.render('pages/postal');
});

app.get('/movies', function(request, response) {
	response.render('pages/movies');
});

app.get("/wmc", (request, response) => {
  response.status(301).redirect("https://www.workingmomsconnection.org")
})

// Good turn stuff :

app.post('/login', (request, response) => {

	loginHandler(request).then((result) => {
		email  = request.session.email;
		online = request.session.online;

		if (online) {
			response.json({"success": "true"});
			console.log('success');
		} else {
			response.json('error');
			console.log('error');
		}
	});
});

app.post('/logout', function(request, response) {

	email = request.session.email;

	if (email) {
		request.session.destroy();
		console.log("Logging out: " + email);
		response.json({"success": "true"});
		console.log('successfully logged out');
	} else {
		response.json({"success": "false"});
		console.log('error logging out');
	}
});

app.get('/goodturn', function(request, response) {
	if (request.session.online) {
		response.render('pages/goodturn');
	} else {
		response.render('pages/login');
	}
});

app.post('/goodturn', function(request, response) {
	request.body.message == null ? {/* do nothing */} : {/* call createhandler */};
	response.render('pages/goodturn', {message: request.body.message});
});

app.get('/login', function(request, response) {
	response.render('pages/login');
});

app.get('/createprofile', function(request, response) {
	response.render('pages/createProfile');
});

app.get('/settings', function(request, response) {
	response.render('pages/settings');
});

app.post('/confirmation', function(request, response) {
	createhandler(request).then((result) => {
		email  = request.session.email;

		if (email) {
			response.render('pages/confirmation', {email: email});
			console.log('success');
		} else {
			response.json('Error creating account.');
			console.log('error');
		}
	});
});

app.post('/messages', function(request, response) {
	messageHandler(request, 'post').then((result) => {
		if (request.session.online) {
			response.json({"success": "true"});
			console.log('success');
		} else {
			response.json('error');
			console.log('error');
		}
		
		response.end();
	});
});

app.get('/messages', function(request, response) {
	messageHandler(request, 'get').then((result) => {
		if (request.session.online) {
			response.json(result);
			console.log('success');
		} else {
			response.json('error');
			console.log('error');
		}
		
		response.end();
	});
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

// Easter Egg
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

// function storeLocation(request, response, next) {
// 	//console.log("Latitude: " + request.body.latitude);
// 	//console.log("Longitude: " + request.body.longitude);
// 	next();
// }

function verifyLogin(request, response, next) {
	if (request.session.email) {
		// login verified
		next();
	} else {
		var result = {succes:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}