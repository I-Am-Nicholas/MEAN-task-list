const expect  = require('chai').expect;
const request = require('supertest');

  beforeEach(function () {
    server = require('../factoryServer')();
  });

  afterEach(function (done) {
    console.log('Server shutting down...')
    server.close(done)
  });


  describe("Server", () => {

    it('responds with 200 for route /', (done) => {
      request(server)
        .get('/')
        .expect(200, done);
    });

  });
