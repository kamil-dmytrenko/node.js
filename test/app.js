// const chai = require('chai');
// const expect = require('chai').expect;
//
//
//
//  // Our app
//
// const chaiFiles = require('chai-files');
// const file = chaiFiles.file;
// const dir = chaiFiles.dir;
//
// describe('API endpoint /movies', function() {
//     this.timeout(5000); // How long to wait for a response (ms)
//
//     before(function() {
//     });
//
//     after(function() {
//     });
//
//     // GET - List all colors
//     it('should return all movies', function() {
//         return chai.request(app)
//             .get('/movies')
//             .then(function(res) {
//                 expect(res).to.have.status(200);
//                 expect(dir('./views/index.ejs')).to.exist;
//
//             });
//     });
//
//     // GET - Invalid path
//     it('should return Not Found', function() {
//         return chai.request(app)
//             .get('/INVALID_PATH')
//             .then(function(res) {
//                 expect(res).to.have.status(404);
//             });
//     });
//
//     // POST - Add new incorrect film

//
//     // POST - Add or find correct film
//     it('should return film from db', function() {
//         return chai.request(app)
//             .post('/movies')
//             .send({title: "Pulp Fiction"})
//             .then(function(res) {
//                 expect(res).to.have.status(200);
//                 // expect(res).to.equal(res);
//                 expect(dir('./views/show-one.ejs')).to.exist;
//             });
//     });
//
// });
//
// describe('API endpoint /comments', function() {
//     this.timeout(5000); // How long to wait for a response (ms)
//
//     before(function() {
//     });
//
//     after(function() {
//     });
//
//     // GET - List all comments
//     it('should return all comments', function() {
//         return chai.request(app)
//             .get('/comments')
//             .then(function(res) {
//                 expect(res).to.have.status(200);
//                 expect(dir('./views/comments/show-all.ejs')).to.exist;
//
//             });
//     });
//
//     // POST - Add correct comment
//     it('should return film from db', function() {
//         return chai.request(app)
//             .post('/comments')
//             .send({
//                 film: {_id: "5ab97bc8932f6d2632e48f98"},
//                 comment: {text: "nice film"}
//             })
//             .then(function(res) {
//                 expect(res).to.have.status(200);
//                 expect(res).to.deep.include({"text": "nice film"});
//             });
//     });
// });

let sinon  = require('sinon'),
    chai   = require('chai'),
    expect = require('chai').expect;

chai.use(require('chai-http'));

let mongoose = require('mongoose');
require('sinon-mongoose');

const app     = require('../app.js'),
      Film    = require('../models/film'),
      Comment = require('../models/comment');

describe("Get all films", () => {

    it("should return all films", (done) => {
        let FilmMock = sinon.mock(Film);
        let expectedResult = {status: true, films: []};
        FilmMock.expects('find').yields(null, expectedResult);
        Film.find((err, result) => {
            FilmMock.verify();
            FilmMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    it("should return error", (done) => {
        let FilmMock = sinon.mock(Film);
        let expectedResult = {status: false, error: "Something went wrong"};
        FilmMock.expects('find').yields(expectedResult, null);
        Film.find((err, result) => {
            FilmMock.verify();
            FilmMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

describe("Post a new film", () => {
    it("should create new film", (done) => {
        let FilmMock = sinon.mock(new Film({ Title: 'Mocked Film'}));
        let film = FilmMock.object;
        let expectedResult = { status: true };
        FilmMock.expects('save').yields(null, expectedResult);
        film.save((err, result) => {
            FilmMock.verify();
            FilmMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the film is not saved
    it("should return error, if film not saved", (done) => {
        let FilmMock = sinon.mock(new Film({ Title: 'Mocked Film'}));
        let film = FilmMock.object;
        let expectedResult = { status: false };
        FilmMock.expects('save').yields(expectedResult, null);
        film.save((err, result)  => {
            FilmMock.verify();
            FilmMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

describe("Get all comments", () => {
    // Test will pass if we get all comments
    it("should return all films", (done) => {
        let CommentMock = sinon.mock(Comment);
        let expectedResult = {status: true, comments: []};
        CommentMock.expects('find').yields(null, expectedResult);
        Comment.find((err, result) => {
            CommentMock.verify();
            CommentMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    // Test will pass if we fail to get a comment
    it("should return error", (done) => {
        let CommentMock = sinon.mock(Comment);
        let expectedResult = {status: false, error: "Something went wrong"};
        CommentMock.expects('find').yields(expectedResult, null);
        Comment.find((err, result) => {
            CommentMock.verify();
            CommentMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });

});

describe("Post a new comment", () => {
    it("should create new comment", (done) => {
        let CommentMock = sinon.mock(new Comment({ text: 'Mocked comment'}));
        let comment = CommentMock.object;
        let expectedResult = { status: true };
        CommentMock.expects('save').yields(null, expectedResult);
        comment.save((err, result) => {
            CommentMock.verify();
            CommentMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    it("should return error, if comment not saved", (done) => {
        let CommentMock = sinon.mock(new Comment({ text: 'Mocked comment'}));
        let comment = CommentMock.object;
        let expectedResult = { status: false };
        CommentMock.expects('save').yields(expectedResult, null);
        comment.save((err, result) => {
            CommentMock.verify();
            CommentMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});