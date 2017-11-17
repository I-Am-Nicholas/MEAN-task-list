const chai = require('chai')
const expect  = require('chai').expect
const request = require('supertest')

describe('SERVER\n', () => {

  beforeEach(() => {
    delete require.cache[require.resolve('../server')]
    server = require('../server')
  })

  afterEach( (done) => {
    console.log('Server shutting down.\n')
    server.close(done)
  })


  describe('INDEX PAGE\n', () => {

    it('responds with 200 for route /', (done) => {
      request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if(err) throw err
        done()
      })
    })

    it('body content', (done) => {
      request(server)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          if(err) throw err
          expect(res.text).to.contain('MEAN Task List')
          done()
        })
    })

  })


  describe('TASKS PAGE\n', () => {

    it('responds with 200 for route /api/tasks', (done) => {
      request(server)
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) throw err
        done()
      })
    })
  })

  it('Invalid route returns appropriate status code', (done) => {
    request(server)
    .get('/invalid/route')
    .expect(404)
    .end((err, res) => {
      if(err) throw err
      done()
    })
  })

})
