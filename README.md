# node.js app using OMDB Api 
You can try out this app under : https://francophone-sorry-73357.herokuapp.com/

## Technologies used: Node.js, Express
* Database: MongoDB hosted on mlab.com
* Views: EJS,
* Testing: Mocha, Chai

routes:

**GET /**  
index route

**GET /movies**  
list of all movies present in MongoDB

**POST /movies**  
req.body.title : movie title to find in OMDB  
validates if present in OMDB, if yes adds to MongoDb and returns film  
else returns: Movie not found!

**GET /comments**  
list of all comments present in MongoDB

**POST /comments**  
req.body.film._id = film id to which we want add new comment  
req.body.comment.text = comment text which we want to add  
adds new comment to specified film

### For local use:  
run in terminal `npm install`  
and `node app.js`  
go to 'http://localhost:3000'  
to run tests `mocha`
