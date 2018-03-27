const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

const chaiFiles = require('chai-files');
const file = chaiFiles.file;
const dir = chaiFiles.dir;

describe('API endpoint /movies', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function() {
    });

    after(function() {
    });

    // GET - List all colors
    it('should return all movies', function() {
        return chai.request(app)
            .get('/movies')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(dir('./views/index.ejs')).to.exist;

            });
    });

    // GET - Invalid path
    it('should return Not Found', function() {
        return chai.request(app)
            .get('/INVALID_PATH')
            .then(function(res) {
                expect(res).to.have.status(404);
            });
    });

    // POST - Add new incorrect film
    it('should return film not found', function() {
        return chai.request(app)
            .post('/movies')
            .send({
                title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.deep.include({"text": "Movie not found!"});
            });
    });

    // POST - Add or find correct film
    it('should return film from db', function() {
        return chai.request(app)
            .post('/movies')
            .send({title: "Pulp Fiction"})
            .then(function(res) {
                expect(res).to.have.status(200);
                // expect(res).to.equal(res);
                expect(dir('./views/show-new.ejs')).to.exist;
            });
    });

});

describe('API endpoint /comments', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function() {
    });

    after(function() {
    });

    // GET - List all comments
    it('should return all comments', function() {
        return chai.request(app)
            .get('/comments')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(dir('./views/comments/show-all.ejs')).to.exist;

            });
    });

    // POST - Add correct comment
    it('should return film from db', function() {
        return chai.request(app)
            .post('/comments')
            .send({
                film: {_id: "5ab97bc8932f6d2632e48f98"},
                comment: {text: "nice film"}
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.deep.include({"text": "nice film"});
            });
    });
});