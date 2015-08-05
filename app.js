var express = require('express');
var app = express();
var swig = require('swig');
var routes = require('./routes');
var tweetBank = require('./tweetBank.js');

swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/', routes);

app.listen(3000, function(){
	console.log('Listening on port 3000');
});

app.use(function(request, response, next){
	console.log(request.method, request.url, response.statusCode);
	next();
});

app.get("/*", function(request, response, next){
	response.sendFile(__dirname + '/public' + request.path, {}, function(err) {
		if (err) {
			console.log(err);
			next();
		} else {
			console.log('Sent: ' + __dirname + '/public' + request.path);
		}
	});
});