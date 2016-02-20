var express = require('express');
var RequestHandler = require('../models/requestHandlers')
var url = require('url');
var mongodata = require('../models/mongoAPI');

var util = require('util');

module.exports = function(app, passport) {

	//app.get('/', function(req, res) {
    //
	//	// render the page and pass in any flash data if it exists
	//	//res.render('GeneralPartials/index.ejs', { message: req.flash('loginMessage') });
	//});

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

	// cards mongo API

	app.get('/api/listcurriculums', function(req, res) { // New Mongo ??
		mongodata.curriculasList(res);
	});

	app.get('/api/listallcategorys', function(req, res) { // New Mongo !!
		mongodata.categorysList(res);
	});

	app.get('/api/categorys/:curiculumid', function(req, res) { // New Mongo !!
		mongodata.categorysByCurricula(res, req.params.curiculumid);
		console.log('/api/categorys/curiculum:curiculumid : req.params.curiculumid  ' + req.params.curiculumid);
	});

	app.get('/api/listallcards', function(req, res) { // New Mongo ??
		console.log('/api/listallcards ');
		mongodata.cardsList(res);
	});

	app.route('/api/cards/category/:categoryid')
		.get(function(req, res) {
			mongodata.cardsByCategory(res, req.params.categoryid);
			console.log ('/api/cards/category:categoryid req.params.categoryid  ' + req.params.categoryid);
		})

	app.route('/api/cards/card:cardid')
		.get(function(req, res) {
			mongodata.cardsById(res, req.params.cardid);
			console.log ('/api/cards/card:cardid : req.params.cardid  ' + req.params.cardid);
		})

	// Auth
	function minAuth() {
		/* GET home page - menu. */
		//app.get('/FB', function(req, res) {
		//	res.redirect('/menu');
		//});

		//
		//app.get('/login', function(req, res) {
		//
		//		// render the page and pass in any flash data if it exists
		//		res.render('login.ejs', { message: req.flash('loginMessage') });
		//	});
		//
		//app.get('/signup', function(req, res) {
		//
		//		// render the page and pass in any flash data if it exists
		//		res.render('signup.ejs', { message: req.flash('signupMessage') });
		//	});
		//
		//// process the signup form
		//app.post('/signup', passport.authenticate('local-signup', {
		//
		//		successRedirect : '/profile', // redirect to the secure profile section
		//		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		//		failureFlash : true // allow flash messages
		//	}));
		//
		//app.get('/profile', isLoggedIn, function(req, res) {
		//		res.render('profile.ejs', {
		//			user : req.user // get the user out of session and pass to template
		//		});
		//	});
		//
		//app.get('/logout', function(req, res) {
		//		req.logout();
		//		res.redirect('/');
		//	});
		//
		//
		//function isLoggedIn(req, res, next) {
		//
		//	// if user is authenticated in the session, carry on
		//	if (req.isAuthenticated())
		//		return next();
		//
		//	// if they aren't redirect them to the home page
		//	res.redirect('/');
		//}
		//
		//app.get('/carddb.json', function(req, res) {
		//	res.json(data.MenuTreeGet()); // change to api call
		//});
	}
};
