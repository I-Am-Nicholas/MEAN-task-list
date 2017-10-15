const expect  = require('chai').expect;
const request = require('supertest');


beforeEach(function () {
  delete require.cache[require.resolve('../server')];
  server = require('../server');
});

afterEach( (done) => {
  console.log('Server shutting down...')
  server.close(done)
});


describe("Index Page", () => {

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


describe("Tasks Page", () => {

  it('responds with 200 for route /api/tasks', (done) => {
    request(server)
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });


});
