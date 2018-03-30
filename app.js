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
require('./controllers/errorController');

//requiring routes
const commentRoutes    = require("./routes/comments"),
      filmRoutes       = require("./routes/films"),
      indexRoutes      = require("./routes/index");

app.use("/", indexRoutes);
app.use("/movies", filmRoutes);
app.use("/comments", commentRoutes);

module.exports = app;

