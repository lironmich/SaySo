var mongoose = require('mongoose');

// mongodb://<dbuser>:<dbpassword>@ds061405.mongolab.com:61405/sayso-dev
mongoose.connect('mongodb://lironmich:123456@ds061405.mongolab.com:61405/sayso-dev');

var Schema = mongoose.Schema;

var languageSchema = new Schema({
    symbol: { type: String, unique: true, required: true, lowercase: true },
    name: { type: String, required: true }
});

var movieSchema = new Schema({
    youtubeId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    language: { type: String, required: true },
    level: { type: Number, required: true },
    viewsCount: { type: Number, required: true },
    likesCount:{ type: Number, required: true },
    category:  { type: String, required: true },
});

var subtitleSchema = new Schema({
    youtubeId: { type: String, required: true },
    subtitles: { type: Schema.Types.Mixed, required: true}
});

var Language = mongoose.model('Language', languageSchema);
var Movie = mongoose.model('Movie', movieSchema);
var Subtitle = mongoose.model('Subtitle', subtitleSchema);

exports.Language = Language;
exports.Movie = Movie;
exports.Subtitle = Subtitle;