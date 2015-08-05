var express = require('express');
var app = express();

app.listen(3000, function(){
	console.log('Listening on port 3000');
});

app.use(function(request, response, next){
	console.log(request.method, request.url, response.statusCode);
	next();
});

app.get('/', function(request, response){
	response.send('welcome to twitter');
});

app.post('/', function(request, response){
	response.send();
});

