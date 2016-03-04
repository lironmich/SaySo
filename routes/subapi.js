var moviemock = [{
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/The_Shawshank_Redemption.jpg",
    "movieName": "The Shawshank Redemption",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 1,
    "viewsCount": 2577,
    "likesCount": 185,
    "category": "Drama"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/The_Godfather.jpg",
    "movieName": "The Godfather",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 2,
    "viewsCount": 2576,
    "likesCount": 186,
    "category": "Crime"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/The_Godfather_Part_II.jpg",
    "movieName": "The Godfather: Part II",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 3,
    "viewsCount": 2575,
    "likesCount": 187,
    "category": "Crime"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/The_Dark_Knight.jpg",
    "movieName": "The Dark Knight",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 4,
    "viewsCount": 2574,
    "likesCount": 188,
    "category": "Action"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/12_Angry_Men.jpg",
    "movieName": "12 Angry Men",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 5,
    "viewsCount": 2573,
    "likesCount": 189,
    "category": "Crime"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/Schindlers_List.jpg",
    "movieName": "Schindler's List",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 6,
    "viewsCount": 2572,
    "likesCount": 190,
    "category": "Drama"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/Pulp_Fiction.jpg",
    "movieName": "Pulp Fiction",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 7,
    "viewsCount": 2571,
    "likesCount": 191,
    "category": "Crime"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/The_Good_the_Bad_and_the_Ugly.jpg",
    "movieName": "The Good, the Bad and the Ugly",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 8,
    "viewsCount": 2570,
    "likesCount": 192,
    "category": "Western"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/The_Lord_of_the_Rings_The_Return_of_the_King.jpg",
    "movieName": "The Lord of the Rings: The Return of the King",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 9,
    "viewsCount": 2569,
    "likesCount": 193,
    "category": "Fantasy"
}, {
    "imageUrl": "apps/SaySo-client/sayso-client/data/img/Fight_Club.jpg",
    "movieName": "Fight Club",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 10,
    "viewsCount": 2568,
    "likesCount": 194,
    "category": "Drama"
}];

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

var mongoAPI = require('../models/mongoAPI');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('client.ejs');
    });

    app.route('/teacher').get(function(req, res) {
        res.render('teacher.ejs');
    });

    app.route('/dbapi/movies').get(function(req, res) {
        mongoAPI.getMovies(res);
    });

    app.route('/dbapi/subtitles').get(function(req, res) {
        mongoAPI.getSubtitles(res);
    });

    app.route('/dbapi/addSubtitle').post(function(req, res) {
        mongoAPI.addSubtitle(req, res);
    });

    app.route('/rdata/movies').get(function(req, res) {
        res.json(moviemock);
    });

    app.route('/rdata/subtitle').get(function(req, res) {
        res.json(subdata);
    });
};