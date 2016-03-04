var models = require('./models');

var movie = models.Movie;
var subtitle = models.Subtitle;

function getMovies(res) {
	movie.find({}, function(err) {
		if (err) res.json.reject(err)
	}).then(function(data){
		res.json(data);
	});
}

function getSubtitles(res) {
	subtitle.find({}, function(err) {
		if (err) res.json.reject(err)
	}).then(function(data){
		res.json(data);
	});
}

function addSubtitle(req, res) {
    var youtubeId = req.body.youtubeId;
    var subtitles = req.body.subtitles;

    if (!youtubeId) {
        res.json.reject('bad params: youtubeId');
        return;
    }

    if (!subtitles){
        res.json.reject('bad params: subtitles');
        return;
    }

    var newSubtitle = new subtitle({
        youtubeId: youtubeId,
        subtitles: subtitles
    });

    newSubtitle.save(function(err) {
        if (err) res.json.reject(err);
        console.log('new subtitle saved');
    })
}

exports.getMovies = getMovies;
exports.getSubtitles = getSubtitles;
exports.addSubtitle = addSubtitle;