// This file handles the configuration of the app.
// It is required by app.js

const express    = require('express'),
      engine     = require('ejs-layout'),
      path       = require('path'),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.engine('ejs', engine.__express);

	// Make the files in the public folder available to the world
	app.use(express.static(__dirname + '/public'));

    // Connect to database
    // mongoose.connect("mongodb://admin:admin@ds121299.mlab.com:21299/movie-rest-app");
    mongoose.connect("mongodb://localhost/rest_movie_app" , function (err, database) {
        if (err)
            throw err;
        else
        {
            db = database;
            console.log('Connected to MongoDB');
            //Start app only after connection is ready
            let port = process.env.PORT || 3000;
            app.listen(port, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Your application is running on http://localhost:' + port);
                }
            });

        }
    });


};
