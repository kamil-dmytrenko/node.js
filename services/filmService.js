const db = require('../models');
const request = require('request');

exports.findInOMDb = (filmTitle, res) => {
  const newFilm = new db.Film({
    Title: filmTitle
  });

  let url = `http://www.omdbapi.com/?apikey=thewdb&t=${filmTitle}`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let result = JSON.parse(body);
      if(result.Title) {
        db.Film.create(newFilm)
          .then(newFilm => {
            db.Film.findOneAndUpdate(newFilm, result, {new: true})
              .then(foundFilm => res.json(foundFilm))
              .catch(err =>(err))
          })
      }
      else res.json(errorController(result.Error));
    }
  });
};

module.exports = exports;