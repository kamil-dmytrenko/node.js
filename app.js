const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./db')(app);

//requiring routes
const commentRoutes = require("./routes/commentRoutes");
const filmRoutes    = require("./routes/filmRoutes");

app.use("/film", filmRoutes);
app.use("/comment", commentRoutes);

module.exports = app;
