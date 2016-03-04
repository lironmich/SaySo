var models = require('./models');

var movie = models.Movie;
var subtitle = models.Subtitle;

function getMovies(req, res) {
	movie.find({}, function(err) {
		if (err) res.json.reject(err)
	}).then(function(data){
		res.json(data);
	});
}

function getSubtitles(req, res) {
	subtitle.find({}, function(err) {
		if (err) res.json.reject(err)
	}).then(function(data){
		res.json(data);
	});
}

exports.getMovies = getMovies;
exports.getSubtitles = getSubtitles;