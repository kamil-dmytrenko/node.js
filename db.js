const mongoose     = require('mongoose');

let port = process.env.PORT;

module.exports = (app) => {
    // Connect to database
  mongoose.connect(process.env.DB_HOST)
    .then(database => {
      db = database;
      console.log('Connected to MongoDB');})
    .then(() => {
      //Start app only after connection is ready
      app.listen(port, () => {
        console.log(`Your application is running on http://localhost:${port}`);
      });
    })
    .catch(err => console.log(err))
};
