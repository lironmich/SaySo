var models = require('./models');

var language = models.Language;
var Movie = models.Movie;
var Subtitle = models.Subtitle;

function getLanguages(req, res) {
    language.find(req.query, function(err) {
        if (err) res.status(400).json(err);
    }).then(function(data){
        res.json(data);
    });
}

function getMovies(req, res) {
	Movie.find(req.query, function(err) {
		if (err) res.status(400).json(err);
    }).then(function(data){
		res.json(data);
	});
}

function getSubtitles(req, res) {
    var query = {};

    var youtubeId = req.query.youtubeId;
    var sourceLang = req.query.sourceLang;
    var targetLang = req.query.targetLang;

    if (youtubeId) {
        query.youtubeId = req.query.youtubeId;
    }

    var isSubtitleMatch = function(subtitle) {
        return (!sourceLang || subtitle.subtitles.sourceLang === sourceLang) &&
            (!targetLang || subtitle.subtitles.targetLang === targetLang)
    };

    Subtitle.find(query, function(err) {
		if (err) res.json.reject(err)
	}).then(function(data){
        data = data.filter(isSubtitleMatch);

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
            res.status(400).json(err);
            return;
        }

        console.log('new language saved');
        res.json();
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
            res.status(400).json(err);
            return;
        }

        console.log('new movie saved');
        res.json();
    });
}

function getMinifiedSubtitles(subtitles) {
    if (!subtitles) {
        return null;
    }

    subtitles.text.forEach(function(_text) {
        var match = _text.match;

        for (var key in match) {
            var value = match[key];

            if (value[0].length === 0 &&
                value[1].length === 0 &&
                value[2].length === 0) {
                delete match[key];
            }
        }
    });

    return subtitles;
}

function getSubtitlesWithoutNewLines(subtitles) {
    if (!subtitles) {
        return null;
    }

    subtitles.text.forEach(function(_text) {
        _text.source = _text.source.replace('\n', ' ');
        _text.target = _text.target.replace('\n', ' ');
        _text.transcript = _text.transcript.replace('\n', ' ');
    });

    return subtitles;
}

function getNormalizedSubtitles(subtitles) {
    subtitles = getMinifiedSubtitles(subtitles);
    return getSubtitlesWithoutNewLines(subtitles);
}

function addSubtitle(req, res) {
    var youtubeId = req.body.youtubeId;
    var subtitles = req.body.subtitles;

    var newSubtitle = new Subtitle({
        youtubeId: youtubeId,
        subtitles: getNormalizedSubtitles(subtitles)
    });

    Subtitle.find({ youtubeId: youtubeId }, function(err) {
        if (err) res.status(400).json(err);
    }).then(function(data){
        var oldSubtitles = data.filter(function(model) {
            return model.subtitles.sourceLang === subtitles.sourceLang &&
                model.subtitles.targetLang === subtitles.targetLang;
        });

        if (oldSubtitles.length < 1) {
            newSubtitle.save(function(err) {
                if (err) {
                    res.status(400).json(err);
                    return;
                }

                console.log('new subtitle saved');
                res.json();
            });
        } else if (oldSubtitles.length === 1) {
            oldSubtitles[0].subtitles = newSubtitle.subtitles;
            oldSubtitles[0].markModified('subtitles');
            oldSubtitles[0].save(function(err) {
                if (err) {
                    res.status(400).json(err);
                    return;
                }

                console.log('new subtitle updated');
                res.json();
            });
        } else {
            var err = 'db contains more than one matching subtitles';
            console.log(err);
            res.status(400).json(err);
        }
    });
}

exports.getLanguages = getLanguages;
exports.getMovies = getMovies;
exports.getSubtitles = getSubtitles;

exports.addLanguage = addLanguage;
exports.addMovie = addMovie;
exports.addSubtitle = addSubtitle;