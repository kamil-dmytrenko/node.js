let express = require("express"),
    request = require('request'),
    errorHandler = require('../controllers/errorController');
    router  = express.Router();

let Film = require("../models/film");

//list of all movies in db
router.get('/', (req, res) => {
    Film.find({}, (err, films) => {
        if (err) return errorHandler(err);
        res.render('films/show-all', {films:films});
    });
});

//show full information about one film
router.get('/:id', (req, res) => {
    Film.findById(req.params.id).populate("comments").exec((err, foundFilm) => {
        if (err) return errorHandler(err);
        res.render('films/show-one', {film: foundFilm})
    })
});

// add new film to db if present in OMDB by passing film title in request body
router.post('/', (req, res) => {
    db.collection('films').findOne({"Title": req.body.title}, (err, foundFilm) =>{
        if (err) return errorHandler(err);
        if (foundFilm) {
            console.log(foundFilm);
            res.render('films/show-one', {film:foundFilm});
        } else {
            let url = 'http://www.omdbapi.com/?apikey=thewdb&t='+req.body.title;
            request(url, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const result = JSON.parse(body);
                    if(result.Title) {
                        const newFilm = new Film({
                            Title: req.body.title,
                        });
                        Film.create(newFilm, (err, newFilm) => {
                            db.collection('films').update(newFilm, result, {upsert: true}, (err, updated) => {
                                if (err) return errorHandler(err);
                                Film.findOne({"Title": result.Title}, (err, foundFilm) => {
                                    if (err) return errorHandler(err);
                                    res.render('films/show-one', {film:foundFilm});
                                })
                            });
                        });
                    } else if (!result.Title){
                        res.send(result.Error);
                    }
                }
            });
        }
    });
});

module.exports = router;