var mongoose = require('mongoose');

// mongodb://<dbuser>:<dbpassword>@ds061405.mongolab.com:61405/sayso-dev
mongoose.connect('mongodb://lironmich:123456@ds061405.mongolab.com:61405/sayso-dev');

var Schema = mongoose.Schema;

var languageSchema = new Schema({
    name: String,
    symbol: String
});

var movieSchema = new Schema({
    name: String,
    imageUrl: String,
    link: String,
    language: String,
    level: Number,
    viewsCount: Number,
    likesCount: Number,
    category: String
});

var subtitleSchema = new Schema({
    youtubeId: String,
    subtitles: {}
});

var Language = mongoose.model('Language', languageSchema);
var Movie = mongoose.model('Movie', movieSchema);
var Subtitle = mongoose.model('Subtitle', subtitleSchema);

exports.Language = Language;
exports.Movie = Movie;
exports.Subtitle = Subtitle;