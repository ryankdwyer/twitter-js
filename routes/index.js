var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function(request, response) {
	var tweets = tweetBank.list();
	response.render('index', {title: 'Twitter.js', tweets: tweets});
});

module.exports = router;