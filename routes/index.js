var bodyParser = require('body-parser');
var router = require('express').Router();
var tweetBank = require('../tweetBank');

module.exports = function(io) {
	router.use('/submit', bodyParser.urlencoded(), function(request, response){
		var name = request.body.name;
	  	var text = request.body.text;
	  	tweetBank.add(name, text);
	  	io.sockets.emit('new_tweet', tweetBank.find({name: name, text: text})[0]);
	  	response.redirect('/');
	});

	router.use(bodyParser.json());

	router.get('/', function(request, response) {
		var tweets = tweetBank.list();
		response.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true});
	});

	router.get('/users/:name', function(request, response){
		var name = request.params.name;
		var tweets = tweetBank.find({name:name});
		console.log(name);
		console.log(tweetBank.list());
		response.render('index', {title: "Tweets of " + name, tweets: tweets, showForm: true, name: name});
	});

	router.get('/users/:name/tweets/:id', function(request, response){		
		//var name = requst.params.name;
		var id = request.params.id;
		var name = request.params.name;
		var tweet = tweetBank.find({name: name, id:Number(id)});
		console.log(tweet);
		console.log(tweetBank.list());
		response.render('index', {title: "Tweet Number " + id, tweets: tweet, showForm: true});
	});
	return router;
};