
//// Mock for Dor
// sub1 = {"00:00:18,578 --> 00:00:19,963" : "first line "};
// sub2 = {"00:00:19,993 --> 00:00:21,265" : "second line"};
// sub3 = {"00:00:21,380 --> 00:00:22,903" : "third line"};
//
// he_tr_en1= {"00:00:18,578 --> 00:00:19,963" : "shura rishona"};
// he_tr_en2= {"00:00:19,993 --> 00:00:21,265" : "shura shniya"};
// he_tr_en3= {"00:00:21,380 --> 00:00:22,903" : "shura shlishit"};
//
// heb1= {"00:00:18,578 --> 00:00:19,963" : "שורה ראשונה"};
// heb2= {"00:00:19,993 --> 00:00:21,265" : "שורה שנייה"};
// heb3= {"00:00:21,380 --> 00:00:22,903" : "שורה שלישית"};
//
// blocks=[];
// blocks[0] = {'en' : sub1, 'heb' : heb1,  couplings : [ ["שורה", "line", "shura"], ["second", "ראשונה", "rishona"] ] };
// blocks[1] = {'en' : sub2, 'heb' : heb2,  couplings : [ ["שורה", "line", "shura"], ["second", "שנייה", "shniya"] ]  };
// blocks[2] = {'en' : sub3, 'heb' : heb3,  couplings : [ ["שורה", "line", "shura"], ["second", "שלישית", "shlishit"] ]  };
//

var moviemock = [{
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/The_Shawshank_Redemption.jpg",
    "movieName": "The Shawshank Redemption",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 1,
    "viewsCount": 2577,
    "likesCount": 185,
    "category": "Drama"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/The_Godfather.jpg",
    "movieName": "The Godfather",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 2,
    "viewsCount": 2576,
    "likesCount": 186,
    "category": "Crime"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/The_Godfather_Part_II.jpg",
    "movieName": "The Godfather: Part II",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 3,
    "viewsCount": 2575,
    "likesCount": 187,
    "category": "Crime"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/The_Dark_Knight.jpg",
    "movieName": "The Dark Knight",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 4,
    "viewsCount": 2574,
    "likesCount": 188,
    "category": "Action"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/12_Angry_Men.jpg",
    "movieName": "12 Angry Men",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 5,
    "viewsCount": 2573,
    "likesCount": 189,
    "category": "Crime"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/Schindlers_List.jpg",
    "movieName": "Schindler's List",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 6,
    "viewsCount": 2572,
    "likesCount": 190,
    "category": "Drama"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/Pulp_Fiction.jpg",
    "movieName": "Pulp Fiction",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 7,
    "viewsCount": 2571,
    "likesCount": 191,
    "category": "Crime"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/The_Good_the_Bad_and_the_Ugly.jpg",
    "movieName": "The Good, the Bad and the Ugly",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 8,
    "viewsCount": 2570,
    "likesCount": 192,
    "category": "Western"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/The_Lord_of_the_Rings_The_Return_of_the_King.jpg",
    "movieName": "The Lord of the Rings: The Return of the King",
    "sourceLanguage": "English",
    "targetLanguage": "Spanish",
    "level": 9,
    "viewsCount": 2569,
    "likesCount": 193,
    "category": "Fantasy"
}, {
    "imageUrl": "public/apps/SaySo-client/sayso-client/data/img/Fight_Club.jpg",
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
}]

var mongodata = require('../models/mongoAPI');

module.exports = function(app, passport) {


    app.get('/cards', function(req, res) {
        res.render('cards.ejs');
        // res.json(blocks);
        // mongodata.Tester(res);
    });

    app.get('/', function(req, res) {
        res.render('client.ejs');
        //  res.sendFile
        // res.json(blocks);
    });

    app.route('/rdata/movies')
        .get (function(req, res) {
            res.json(moviemock);
        })

    app.route('/rdata/subtitle')
        .get (function(req, res) {
            res.json(subdata);
        })

    app.get('/clientcontrol', function(req, res) {
        res.render('client.ejs');
        //  res.sendFile
        // res.json(blocks);
    });


    app.route('/teacher')
        .get (function(req, res) {
            res.render('teacher.ejs');
        })

    // get / set movie = movie=id / new

    app.get('/viewsrtmock', function(req, res) {
        mongodata.viewFiles(res);
    });

    app.get('/parsesrtmock', function(req, res) {
        mongodata.InitDBMocks(res);
    });

    app.get('/cliplist', function(req, res) {
        mongodata.clipList(res);
    });

    //  /dbapi/movies
    app.route('/dbapi/languages')
        .get (function(req, res) {
            // No params
            mongodata.getLanguages(req, res);
        })


    //  /dbapi/movies
    app.route('/dbapi/movies')
        .get (function(req, res) {
            // params category, source_language, dest_language
            mongodata.getMovies(req, res);
        })


    // @params
    // start_time : "dd:dd:dd,ddd"      || "00:00:00,000"
    // end_time   : "dd:dd:dd,ddd" || start_time +4
    app.route('/dbapi/moviesub/:id')
        .get (function(req, res) {
            console.log("'/dbapi/moviesub/:id");
            mongodata.getMovieSub(req, res);
        })
        // .put .delete .update


    //  teacher/movie/2424?lan1=he&lan2=en&lan3=tr
    app.route('/teacher/movie/:movie_id')

        .get(function(req, res) {

            id = req.params.movie_id;
            lan1 = req.query.lan1;
            lan2 = req.query.lan2;
            lan3 = req.query.lan3;

            res.json("");
        })

        .put(function(req, res) {
            console.log('put function');
        })

        .delete(function(req, res) {
            console.log('delete function');
        })

        .post(function(req, res) {
            console.log('post function');
        })

};
