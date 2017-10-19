'use strict';

var chai = require('chai');
var expect  = require('chai').expect;

const request = require('supertest');

describe('Server', () => {

  beforeEach(function () {
    delete require.cache[require.resolve('../server')];
    server = require('../server');
  });

  afterEach( (done) => {
    console.log('Server shutting down.')
    server.close(done)
  });


  describe('Index Page', () => {

    it('responds with 200 for route /', (done) => {
      request(server)
        .get('/')
        .expect(200, done);
    });

    it('body content', (done) => {
      request(server)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          if(err) throw err;
          expect(res.text).to.contain('MEAN Task List');
          done();
        });
    });

  });


  describe('Tasks Page', () => {

    it('responds with 200 for route /api/tasks', (done) => {
      request(server)
        .get('/api/tasks')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  });

  it('Invalid route returns appropriate status code', (done) => {
    request(server)
      .get('/invalid/route')
      .expect(404, done);
  });

});


describe('Database', () => {

  var mongoose = require('mongoose');
  mongoose.Promise = global.Promise;

  mongoose.connection.openUri('mongodb://localhost/task-list-test')
  var db = mongoose.connection;


  after((done) => {
    db.once('open', () => {
      console.log('Database Connected.')
    });
    db.dropDatabase(() => {
      console.log('Database dropped.')
    });
    db.close(() => {
      console.log('Connection closed.')
      done();
    });
  });


});
