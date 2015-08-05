var express = require('express');
var app = express();
var routes = require('./routes');
var swig = require('swig');
var tweetBank = require('./tweetBank.js');
var socketio = require('socket.io');
var server = app.listen(3000);
var io = socketio.listen(server);

swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/', routes(io));

app.use(function(request, response, next){
	console.log(request.method, request.url, response.statusCode);
	next();
});

// app.get("/*", function(request, response, next){
// 	response.sendFile(__dirname + '/public' + request.path, {}, function(err) {
// 		if (err) {
// 			console.log(err);
// 			next();
// 		} else {
// 			console.log('Sent: ' + __dirname + '/public' + request.path);
// 		}
// 	});
// });

app.use(express.static(__dirname + '/public'));