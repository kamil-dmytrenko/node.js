let sinon  = require('sinon'),
    chai   = require('chai'),
    expect = require('chai').expect;

chai.use(require('chai-http'));

let mongoose = require('mongoose');
require('sinon-mongoose');

const app     = require('../app.js'),
      Film    = require('../models/filmModel'),
      Comment = require('../models/commentModel');

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