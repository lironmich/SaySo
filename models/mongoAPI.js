var models = require('./models');

var language = models.Language;
var Movie = models.Movie;
var Subtitle = models.Subtitle;

function getLanguages(req, res) {
    var findParams = {};

    var name = req.query.name;
    if (name) {
        findParams.name = name;
    }

    var symbol = req.query.symbol;
    if (symbol) {
        findParams.symbol = symbol;
    }

    language.find({}, function(err) {
        if (err) res.json.reject(err)
    }).then(function(data){
        res.json(data);
    });
}

function getMovies(req, res) {
    var findParams = {};

    var language = req.query.language;
    if (language) {
        findParams.language = language;
    }

	Movie.find(findParams, function(err) {
		if (err) res.json.reject(err)
	}).then(function(data){
		res.json(data);
	});
}

function getSubtitles(req, res) {
    Subtitle.find({}, function(err) {
		if (err) res.json.reject(err)
	}).then(function(data){
		res.json(data);
	});
}

function addLanguage(req, res) {
    var newLanguage = new language({
        name: req.body.name,
        symbol: req.body.symbol
    });

    newLanguage.save(function(err) {
        if (err) {
            res.json.reject(err);
            return;
        }
        console.log('new language saved');
    });
}

function addMovie(req, res) {
    var newMovie = new Movie({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        link: req.body.link,
        language: req.body.language,
        level: req.body.level,
        viewsCount: req.body.viewsCount,
        likesCount: req.body.likesCount,
        category: req.body.category
    });

    newMovie.save(function(err) {
        if (err) {
            res.json.reject(err);
            return;
        }
        console.log('new movie saved');
    })
}

function addSubtitle(req, res) {
    var newSubtitle = new Subtitle({
        youtubeId: req.body.youtubeId,
        subtitles: req.body.subtitles
    });

    newSubtitle.save(function(err) {
        if (err) {
            res.json.reject(err);
            return;
        }
        console.log('new subtitle saved');
    })
}

exports.getLanguages = getLanguages;
exports.getMovies = getMovies;
exports.getSubtitles = getSubtitles;

exports.addLanguage = addLanguage;
exports.addMovie = addMovie;
exports.addSubtitle = addSubtitle;