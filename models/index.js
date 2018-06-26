const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.Promise = Promise;

module.exports.Film = require("./filmModel");
module.exports.Comment = require("./commentModel");