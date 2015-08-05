var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function(request, response) {
	var tweets = tweetBank.list();
	response.render('index', {title: 'Twitter.js', tweets: tweets});
});


router.get('/users/:name', function(request, response){
	var name = request.params.name;
	
	var tweets = tweetBank.find({name:name});

	console.log(name);
	console.log(tweetBank.list());
	response.render('index', {title: "Tweets of " + name, tweets: tweets});
	
});

router.get('/users/:name/tweets/:id', function(request, response){
	
	//var name = requst.params.name;
	var id = request.params.id;
	
	var name = request.params.name;
	
	var tweet = tweetBank.find({name: name, id:Number(id)});
	
	console.log(tweet);
console.log(tweetBank.list());

	
	response.render('index', {title: "Tweet Number " + id, tweets: tweet});
})

module.exports = router;