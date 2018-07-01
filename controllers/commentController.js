const db = require('../models');

//add new comment to film by passing film id and comment text in request body
exports.createOne = (req,res) => {
  const newComment = new db.Comment({
    text:req.body.text
  });
  db.Film.findById(req.body._id)
    .then(foundFilm => {
      db.Comment.create(newComment)
        .then(comment => {
          comment.save();
          foundFilm.comments.push(comment);
          foundFilm.save();
          res.json(foundFilm.populate('comments').comments);
        })
    })
};

//find all comments present in db
exports.getAll = (req,res) => {
  db.Film.find({}).populate("comments")
    .then(foundFilms => res.json(foundFilms.comments))
    .catch(err => res.json(err))
};

//find one comment by passing _id in params
exports.getOne = (req,res) => {
  db.Comment.findById(req.params.id)
    .then(foundComment => res.json(foundComment))
    .catch(err => res.json(err))
};

//update one comment by passing _id in params and updated data in req.body
exports.updateOne = (req,res) => {
  db.Comment.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(foundComment => res.json(foundComment))
    .catch(err => res.json(err))
};

//delete one comment by passing _id in params
exports.deleteOne = (req,res) => {
  db.Comment.remove({_id: req.params.id})
    .then(() => res.json({message: `deleted`}))
    .catch(err => res.json(err))
};

module.exports = exports;
