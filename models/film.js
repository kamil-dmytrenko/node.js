const mongoose = require('mongoose');


module.exports = mongoose.model('Film', new mongoose.Schema({
    Title: { type : String , unique : true, required : true, dropDups: true },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}));


