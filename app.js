var express = require('express');
var swig = require('swig');
swig.setDefaults({cache: false});
var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.listen(3000, function(){
	console.log('Listening on port 3000');
});

app.use(function(request, response, next){
	console.log(request.method, request.url, response.statusCode);
	next();
});

app.get('/', function(request, response){
	response.render('index', data);
});

app.post('/', function(request, response){
	response.send();
});

var data = {
    title: 'An Example',
    people: [{
        name: 'Gandalf',
    }, {
        name: 'Frodo'
    }, {
        name: 'Hermione'
    }]
};