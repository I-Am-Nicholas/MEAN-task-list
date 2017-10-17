const expect  = require('chai').expect;
const request = require('supertest');


beforeEach(function () {
  delete require.cache[require.resolve('../server')];
  server = require('../server');
});

afterEach( (done) => {
  console.log('Server shutting down.')
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

let task2 = {"_id":"59e4547d566c36829f9b22ac","Task 2":"Take Mark VII for test flight.","isDone":false}

  it('responds with 200 for route /api/tasks', (done) => {
    request(server)
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should not be empty', (done) => {
    request(server)
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) throw err;
        expect(res.body).to.have.lengthOf(3)
      done();
    });
  });

  it('should return one specific db document of three', (done) => {
    request(server)
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) throw err;
        console.log(res.body)
        expect(res.body[1].Task2).to.equal('Take Mark VII for test flight.', done)
        expect(res.body[1].isDone).to.equal(false);
        done();
      });
  });

  it('should return one specific db document by id number', (done) => {
    request(server)
      .get('/api/task/59e4532c566c36829f9b22ab')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) throw err;
        expect(res.body.Task1).to.equal("Polish Mark VII");
        expect(res.body.isDone).to.equal(false);
        done();
      });
  });

});

it('Invalid route returns appropriate status code', (done) => {
  request(server)
    .get('/invalid/route')
    .expect(404, done);
});
