const mongoose = require('mongoose');

module.exports = mongoose.model('Film', new mongoose.Schema({
    Title: { type : String , unique : true, required : true, dropDups: true },
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Ratings : [
        {
            Source : String,
            Value : String
        },
        {
            Source : String,
            Value : String
        },
        {
            Source : String,
            Value : String
        }
    ],
    Metascore : String,
    imdbRating : String,
    imdbVotes : String,
    imdbID : String,
    Type : String,
    DVD : String,
    BoxOffice : String,
    Production : String,
    Website : String,
    Response : String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}));
