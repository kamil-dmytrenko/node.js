const mongoose     = require('mongoose');

let port = process.env.PORT || 3000;
let CONNECT_URI = 'mongodb://localhost/movie-rest-app';
// let CONNECT_URI = 'mongodb://admin:admin@ds121299.mlab.com:21299/movie-rest-app';

module.exports = (app) => {
    // Connect to database
  mongoose.connect(CONNECT_URI)
    .then(database => {
      db = database;
      console.log('Connected to MongoDB');})
    .then(() => {
      //Start app only after connection is ready
      app.listen(port, () => {
        console.log(`Your application is running on http://localhost:${port}`);
      });
    })
    .catch(err => app.send(err))
};
