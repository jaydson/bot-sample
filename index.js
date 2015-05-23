var express = require('express');
var app = express();
var RiveScript = require("rivescript");
var bot = new RiveScript({ debug: false });
var user = 'Jaydson';

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/ask/:question', function (req, res) {
	var question = req.params.question;
	bot.loadDirectory("./brain", function(data) {
		bot.sortReplies();
		var reply = bot.reply(user, question);
		res.type('application/json');
		res.send(JSON.stringify({ answer: reply }));
	}, function(e) {
		res.send(e);
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Veronika server is listening at http://%s:%s', host, port);
});
