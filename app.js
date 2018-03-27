// This is the main file of our app. It initializes a new
// express.js instance, requires the config file
// and listens on a port. Start the application by running
// 'node app.js' in your terminal

const express  = require('express'),
      request  = require('request'),
	  app      = express();

const Film    = require('./models/film'),
      Comment = require('./models/comment');

// Require the configuration and pass
// the app as argument to the returned functions.
require('./config')(app);


app.get('/', (req, res) => {
   res.render('index');
});

//list of all movies in db
app.get('/movies', (req, res) => {
    Film.find({}, (err, films) => {
        if (err) throw err;
        res.render('films/show-all', {films:films});
    });
});

// add new film to db if present in OMDB by passing film title in request body
app.post('/movies', (req, res) => {
    db.collection('films').findOne({"Title": req.body.title}, (err, foundFilm) =>{
       if (err) throw err;
       if (foundFilm) {
           res.render('films/show-new', {film:foundFilm});
           // res.send(foundFilm);
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
                               if (err) throw err;
                               Film.findOne({"Title": result.Title}, (err, foundFilm) => {
                                   if (err) throw err;
                                   res.render('films/show-new', {film:foundFilm});
                                   // res.send(foundFilm);
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

// find all comments present in db
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) throw err;
        res.render('comments/show-all', {comments:comments});
    });
});

//add new comment to film by passing film id and comment text in request body
app.post('/comments', (req, res) => {
    const filmID = req.body.film._id;
    const comment_text = req.body.comment.text;
    Film.findById(filmID, (err, foundFilm) => {
       if (err) {
           res.send(err);
       } else {
           const newComment = new Comment({
              text:comment_text
           });
           Comment.create(newComment, (err, comment) => {
               comment.save();
               foundFilm.comments.push(comment);
               foundFilm.save();
               Comment.findById(comment._id, (err, foundComment) => {
                   if (err) throw err;
                   res.send(foundComment.text);
               });
           });
       }
    })
});

function findAllCommentsWithAssociatedFilmName() {
    Film.find({}, (err, foundFilms) => {
        if (err) throw err;
        Comment.find({}, (err, foundComments) => {
            if (err) throw err;

        })
    });
}

// findAllCommentsWithAssociatedFilmName();

module.exports = app;

