// This is the main file of our app. It initializes a new
// express.js instance, requires the config and routes files
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

// list of all movies already present in application database
app.get('/movies', (req, res) => {
    Film.find({}, (err, films) => {
        if (err) {
            res.send(err);
        } else {
            res.send(films);
        }
    });
});

// add new film to db if present in OMDB by passing film title in request body
app.post('/movies', (req, res) => {
    let url = 'http://www.omdbapi.com/?apikey=thewdb&t='+req.body.title;
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            if(result.Title) {
                db.collection('films').insert(result, function (err, result) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('films/show-one', {film: result});
                    }
                });
            } else if (!result.Title){
                res.send(result.Error);
            }
        }
    });
});

// find all comments present in db
app.get('/comments', (req, res) => {
    //find associated with specified film NIE DZIAŁA 
    // Film.findById(req.params.filmId).populate("comments").exec((err, foundFilm) => {
    //     if (err) {
    //         res.send(err)
    //     } else {
    //         // res.render('comments/show-by-film', {foundFilm: foundFilm})
    //         res.send(foundFilm)
    //     }
    // });

    //find all DZIAŁA
    Comment.find({}, (err, comments) => {
        if (err) {
            res.send(err);
        } else {
            res.render('comments/show-all', {comments: comments});
        }
    });
});

//add new comment to film by passing film id and comment text in request body
app.post('/comments', (req, res) => {
   Film.findById(req.body.filmId, (err, foundFilm) => {
       if (err) {
           res.send(err);
       } else {
           console.log(foundFilm);
           Comment.create(req.body, (err, comment) => {
               if (err) {
                   res.send(err);
               } else {
                   comment.text = req.body.text;
                   comment.save();
                   console.log(comment);
                   console.log(foundFilm);
                   // foundFilm.comments.push(comment);
                   // foundFilm.save();
                   // res.redirect('/movies');
               }
           })
       }
   })
});

function seed_db_with_comments() {
    Film.find({}, (err, films) => {
        if (err) {
            console.log("Error" + err);
        } else {
            films.forEach((film) => {
                Comment.create({
                    text: film.Title + ' is great'
                }, (err, comment) => {
                    if(err){
                        console.log(err);
                    } else {
                        film.comments.push(comment);
                        film.save();
                        console.log("Created new comment");
                    }
                })
            });
        }
    });
}
// seed_db_with_comments();



