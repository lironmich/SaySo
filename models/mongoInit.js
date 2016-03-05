var models = require('./models');

var Language = models.Language;
var Movie = models.Movie;

var languagesMock = [{
    name: 'Arabic',
    symbol: 'ar'
}, {
    name: 'Portuguese',
    symbol: 'pt'
}, {
    name: 'English',
    symbol: 'en'
}, {
    name: 'Russian',
    symbol: 'ru'
}, {
    name: 'French',
    symbol: 'fr'
}, {
    name: 'Hebrew',
    symbol: 'he'
}, {
    name: 'Spanish',
    symbol: 'sp'
}, {
    name: 'German',
    symbol: 'de'
}, {
    name: 'Finnish',
    symbol: 'fi'
}, {
    name: 'Danish',
    symbol: 'da'
}, {
    name: 'Japanese',
    symbol: 'ja'
}, {
    name: 'Greek',
    symbol: 'el'
}, {
    name: 'Chinese',
    symbol: 'zh'
}];

var moviesMock = [{
    youtubeId: "6hB3S9bIaco",
    name: "The Shawshank Redemption",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/The_Shawshank_Redemption.jpg",
    language: "English",
    level: 1,
    viewsCount: 2577,
    likesCount: 185,
    category: "Drama"
}, {
    youtubeId: "1aV9X2d-f5g",
    name: "The Godfather",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/The_Godfather.jpg",
    language: "English",
    level: 2,
    viewsCount: 2576,
    likesCount: 186,
    category: "Crime"
}, {
    youtubeId: "wPmTp9up26w",
    name: "The Godfather: Part II",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/The_Godfather_Part_II.jpg",
    language: "English",
    level: 3,
    viewsCount: 2575,
    likesCount: 187,
    category: "Crime"
}, {
    youtubeId: "EXeTwQWrcwY",
    name: "The Dark Knight",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/The_Dark_Knight.jpg",
    language: "English",
    level: 4,
    viewsCount: 2574,
    likesCount: 188,
    category: "Action"
}, {
    youtubeId: "nfAbTyAcgpE",
    name: "12 Angry Men",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/12_Angry_Men.jpg",
    language: "English",
    level: 5,
    viewsCount: 2573,
    likesCount: 189,
    category: "Crime"
}, {
    youtubeId: "NSsv86lsok",
    name: "Schindler's List",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/Schindlers_List.jpg",
    language: "English",
    level: 6,
    viewsCount: 2572,
    likesCount: 190,
    category: "Drama"
}, {
    youtubeId: "Y4cLmXml8O0",
    name: "Pulp Fiction",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/Pulp_Fiction.jpg",
    language: "English",
    level: 7,
    viewsCount: 2571,
    likesCount: 191,
    category: "Crime"
}, {
    youtubeId: "t5eLNBoZi0Q",
    name: "The Good, the Bad and the Ugly",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/The_Good_the_Bad_and_the_Ugly.jpg",
    language: "English",
    level: 8,
    viewsCount: 2570,
    likesCount: 192,
    category: "Western"
}, {
    youtubeId: "rCZ3SN65kIs",
    name: "The Lord of the Rings: The Return of the King",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/The_Lord_of_the_Rings_The_Return_of_the_King.jpg",
    language: "English",
    level: 9,
    viewsCount: 2569,
    likesCount: 193,
    category: "Fantasy"
}, {
    youtubeId: "SUXWAEX2jlg",
    name: "Fight Club",
    imageUrl: "apps/SaySo-client/sayso-client/data/img/Fight_Club.jpg",
    language: "English",
    level: 10,
    viewsCount: 2568,
    likesCount: 194,
    category: "Drama"
}];

function initLanguages() {
    languagesMock.forEach(function(language) {
        var newLanguage = new Language(language);
        newLanguage.save(function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('new language added: ' + language.symbol);
        });
    });
}

function initMovies() {
    moviesMock.forEach(function(movie) {
        var newMovie = new Movie(movie);
        newMovie.save(function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('new movie added: ' + movie.youtubeId);
        });
    });
}

function initDB() {
    initLanguages();
    initMovies();
}

exports.languagesMock = languagesMock;
exports.moviesMock = moviesMock;
exports.initDB = initDB;

