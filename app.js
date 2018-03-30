// This is the main file of our app. It initializes a new
// express.js instance, requires the config file
// and listens on a port. Start the application by running
// 'node app.js' in your terminal

const express  = require('express'),
	  app      = express();

const Film    = require('./models/film'),
      Comment = require('./models/comment');

// Require the configuration and pass
// the app as argument to the returned functions.
require('./config')(app);

//requiring routes
var commentRoutes    = require("./routes/comments"),
    filmRoutes = require("./routes/films"),
    indexRoutes      = require("./routes/index");

app.use("/", indexRoutes);
app.use("/movies", filmRoutes);
app.use("/comments", commentRoutes);




function errorHandler (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}
module.exports = app;

