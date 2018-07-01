const service = require('../services/filmService');
const db = require('../models');

//add new film to db by passing title in req.body.title
exports.createOne = (req,res) => {
  db.Film.findOne({"Title": req.body.title}).populate("comments")
    .then(foundFilm => {
        if (foundFilm) res.json(foundFilm);
        else service.findInOMDb(req.body.title, res);
    })
    .catch(err => res.json(err))
};

//find all films present in db
exports.getAll = (req,res) => {
  db.Film.find({}).populate("comments")
    .then(films => res.json(films))
    .catch(err => res.json(err))
};

//find one film by passing _id in params
exports.getOne = (req,res) => {
  db.Film.findById(req.params.id).populate("comments")
    .then(foundFilm => res.json(foundFilm))
    .catch(err => res.json(err))
};

//update one film by passing _id in params and updated data in req.body
exports.updateOne = (req,res) => {
  db.Film.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).populate("comments")
    .then(foundFilm => res.json(foundFilm))
    .catch(err => res.json(err))
};


//delete one film by passing _id in params
exports.deleteOne = (req,res) => {
  db.Film.remove({_id: req.params.id})
    .then(() => res.json({message: `deleted`}))
    .catch(err => res.json(err))
};

module.exports = exports;
