var RequestHandler = require('../models/requestHandlers')
var url = require('url');

module.exports = function(app, passport) {

	app.get('/apps/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});

	app.get('/res/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});

	app.get('/libs/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});

	app.get('/content/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});

	app.get('/favicon.ico', function(req, res) {
		res.sendfile('./public/favicon.ico');
	});

	app.get('/controllers/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});

	app.get('/node_modules/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});

	app.get('/views/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});
};
