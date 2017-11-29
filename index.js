var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var session = require('express-session');
var dbhandler = require('./dbhandler.js');
var path = require ('path');

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

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname + '/public')));

// views is directory for all template files
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/goodturn', function(request, response) {
	response.render('pages/goodturn/index.ejs', {message: null});
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