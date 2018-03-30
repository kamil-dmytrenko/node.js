let express = require("express"),
    errorHandler = require('../controllers/errorController');
    router  = express.Router();

let Comment = require("../models/comment"),
    Film    = require("../models/film");

// find all comments present in db
router.get('/', (req, res) => {
    Film.find({}).populate("comments").exec((err, foundFilms) => {
        if (err) return errorHandler(err);
        res.render('comments/show-all', {films: foundFilms});
    });
});

//add new comment to film by passing film id and comment text in request body
router.post('/', (req, res) => {
    const filmID = req.body.film._id;
    const comment_text = req.body.comment.text;
    Film.findById(filmID, (err, foundFilm) => {
        if (err) return errorHandler(err);
        const newComment = new Comment({
            text:comment_text
        });
        Comment.create(newComment, (err, comment) => {
            comment.save();
            foundFilm.comments.push(comment);
            foundFilm.save();
            res.redirect('/movies/'+filmID);
        });
    })
});

module.exports = router;