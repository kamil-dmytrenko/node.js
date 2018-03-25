const mongoose = require("mongoose"),
      Film = require("./models/film"),
      Comment   = require("./models/comment");

const data = [
    {
        title: "Star Wars: Episode I - The Phantom Menace"
    },
    {
        title: "Star Wars: Episode II - Attack of the Clones"
    },
    {
        title: "Star Wars: Episode III - Revenge of the Sith"
    },
    {
        title: "Star Wars: Episode VI - Return of the Jedi"
    },
    {
        title: "Star Wars: Episode V - The Empire Strikes Back"
    },
    {
        title: "Star Wars: Episode IV - A New Hope"
    },
    {
        title: "Star Wars: The Force Awakens"
    },
    {
        title: "Star Wars: The Clone Wars"
    },
    {
        title: "Rogue One: A Star Wars Story"
    },
    {
        title: "Star Wars: The Last Jedi"
    },

];

function seedDB(){
    //Remove all films
    Film.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all films!");
        //add a few films
        data.forEach(function(seed){
            Film.create(seed, function(err, film){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a film");
                    //create a comment
                    Comment.create(
                        {
                            text: "great film " + film.title,
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                film.comments.push(comment);
                                film.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;