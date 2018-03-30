let express = require("express"),
    router  = express.Router();

let Film = require("../models/film");


router.get('/', (req, res) => {
    Film.find({}, (err, films) => {
        if (err) return errorHandler(err);
        res.render('index', {films:films});
    });
});

module.exports = router;
