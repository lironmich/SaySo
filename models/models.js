var mongoose = require('mongoose');

// mongodb://<dbuser>:<dbpassword>@ds061405.mongolab.com:61405/sayso-dev
mongoose.connect('mongodb://lironmich:123456@ds061405.mongolab.com:61405/sayso-dev');

var Schema = mongoose.Schema;

var movieSchema = new Schema({
    name: String,
    provider: String,
    link: String,
    source_lan: {},
    dest_lans: {},
    imageUrl: String,
    "level": Number,
    "viewsCount": Number,
    "likesCount": Number,
    "category": String
});

var subtitleSchema = new Schema({
    youtubeId: String,
    subtitles: {}
});

var Movie = mongoose.model('Movie', movieSchema);
var Subtitle = mongoose.model('Subtitle', subtitleSchema);

exports.Movie = Movie;
exports.Subtitle = Subtitle;