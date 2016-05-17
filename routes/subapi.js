
var subdata = [{
    "en": {"00:00:00,000 --> 00:00:05,000" : "How do you do it?"},
    "he_tr_en": {"00:00:00,000 --> 00:00:05,000" : "eikh ata ose et ze?"},
    "he": {"00:00:00,000 --> 00:00:05,000" : "איך אתה עושה את זה?"},
    "couplings": [
        ["איך", "How", "eikh"],
        ["אתה", "you", "ata"],
        ["עושה", "do", "ose"],
        ["את זה", "it", "et ze"]
    ]
}];

var mongoInit = require('../models/mongoInit');
var mongoAPI = require('../models/mongoAPI');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('client.ejs');
    });

    app.route('/teacher').get(function(req, res) {
        res.render('teacher.ejs');
    });

    app.route('/dbapi/init').get(function(req, res) {
        mongoInit.initDB();
        res.json('initializing db');
    });

    app.route('/dbapi/languages').get(function(req, res) {
        mongoAPI.getLanguages(req, res);
    });

    app.route('/dbapi/movies').get(function(req, res) {
        mongoAPI.getMovies(req, res);
    });

    app.route('/dbapi/subtitles').get(function(req, res) {
        mongoAPI.getSubtitles(req, res);
    });

    app.route('/dbapi/youtubeIdsPerLanguages').get(function(req, res) {
        mongoAPI.getYoutubeIdsPerLanguages(req, res);
    });
    //Smart function that brings either based on movie language, or by translation languages (if targetLang is passed)
    app.route('/dbapi/moviesPerLanguages').get(function(req, res) {
        mongoAPI.getMoviesPerLanguages(req, res);
    });
    //only for testings
    app.route('/dbapi/moviesPerTranslations').get(function(req, res) {
        mongoAPI.getMoviesPerTranslations(req, res);
    });




    app.route('/dbapi/addLanguage').post(function(req, res) {
        mongoAPI.addLanguage(req, res);
    });

    app.route('/dbapi/addMovie').post(function(req, res) {
        mongoAPI.addMovie(req, res);
    });

    app.route('/dbapi/addSubtitle').post(function(req, res) {
        mongoAPI.addSubtitle(req, res);
    });

    app.route('/rdata/movies').get(function(req, res) {
        var moviesMock = mongoInit.moviesMock;
        res.json(moviesMock);
    });

    app.route('/rdata/subtitle').get(function(req, res) {
        res.json(subdata);
    });
};