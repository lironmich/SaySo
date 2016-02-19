var mongoose = require('mongoose');

function mongoInit(){
  console.log("mongo Init");
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    console.log("mongo connection open");
  });
}

// mongodb://<dbuser>:<dbpassword>@ds061405.mongolab.com:61405/sayso-dev
mongoose.connect('mongodb://lironmich:123456@ds061405.mongolab.com:61405/sayso-dev');



// mongoose.connect('mongodb://localhost/cards');

var Schema = mongoose.Schema;

// Cards

var curriculaSchema = new Schema({
  name: String,
  admins: String, // users
});

var subcategorySchema = new Schema({
  curricula: [curriculaSchema],
  symbol: String,
});

var cardSchema = new Schema({
  name: String,
  subcategory: [subcategorySchema],
  facess : [{
  		    ordernum : Number,
  		    symbol : String, //"subcategory_id.symbol",
			text : String,
			sound : Boolean,
			previewDisplay : Boolean
  		  }],
});

// SaySo

var languageSchema = new Schema({
  symbol : String,    // maybe Enum
  name : String,
});

var movieSchema = new Schema({
  name: String,
  provider: String, // maybe schema?
  link: String,
  source_lan: [languageSchema],
  dest_lans: [languageSchema],
  imageUrl: String,
  "level": Number,        // enum ?
  "viewsCount": Number,
  "likesCount": Number,
  "category": String    // schema vs enum
});

var saySoBlockSchema = new Schema({
  startTime: Number, // in ms
  endTime: Number,   // in ms
  source_lan_text : String,      // block
  dest_lan_text : String,  // block
  trans_block_text : String,     // block
  block_no : Number,
  dest_couplings  : {},
  trance_couplings  : {},
});

// add a virtual that returns startTime-->endTime
saySoBlockSchema.virtual('time')
    .get( function () {
      return this.startTime + '-->' + this.endTime;
    });

var movieSubtitlesSchema = new Schema({
  movie : [movieSchema],  // TBD change from embedded document to document reference
  // movie_Id : { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, ||  movieSchema
  destlan: [languageSchema],
  subs  : [saySoBlockSchema], // array
});

// Decs

var Movie = mongoose.model('Movie', movieSchema);
var Language = mongoose.model('Language', languageSchema);
var SaySoBlock = mongoose.model('SaySoBlock', saySoBlockSchema);
var MovieSubtitles = mongoose.model('MovieSubtitles', movieSubtitlesSchema);

exports.Movie = Movie;
exports.Language = Language;
exports.SaySoBlock = SaySoBlock;
exports.MovieSubtitles = MovieSubtitles;


// Card decks

var Curricula = mongoose.model('Curricula', curriculaSchema);
var Subcategory = mongoose.model('Subcategory', subcategorySchema);
var Card = mongoose.model('Card', cardSchema);

exports.Curricula = Curricula;
exports.Subcategory = Subcategory;
exports.Card = Card;
