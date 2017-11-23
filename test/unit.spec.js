const chai = require('chai')
const expect  = require('chai').expect
const assert  = require('chai').assert
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

var db = require('../db')
const testData = require('./testData')

//MOCK HTTP RESPONSE + REQUEST
var httpMocks = require('node-mocks-http')
var stubResponse = httpMocks.createResponse({})
var mockRequest = require('dupertest')

//ODM
let mongoose = require('mongoose')
let connection = mongoose.connection

//TEST DATABASE SCHEMA
var schema = require('../public/schemas/schema')
var testSchema = new mongoose.Schema(schema)

//MODEL ACCESS
var getTasks = require( '../models/tasks')

//TESTS
describe('DATABASE\n', async function() {

  let dbRefillLength = testData.testTasks.length

  beforeEach(async function() {
    await db.testData()
  })

  after(async function() {
    await mongoose.connection.close()
    connection.on('disconnected', function() {
    })
    console.log('DB Disconnected')
  })


  it('should return the correct number of documents', async function() {
    let tasks = await getTasks.allTasks(stubResponse)
    expect(tasks).to.have.lengthOf(dbRefillLength)
  })

  it('should return the correct document', function() {
    mockRequest(getTasks.oneTask)
    .params({id: '59e4547d566c36829f9b22ac'})
    .end(function(response) {
      expect(response.task).to.equal('Take Mark VII for test flight.')
    })
  })

  it('should recognise and alert of an unfound ID', async function() {
     await mockRequest(getTasks.oneTask)
    .params({id: 'fake id'})
    .end(function(response) {
      expect(response).to.equal("Unable to find task with id: fake id")
    })
  })

  await it('should find and delete the correct document', async function() {
    mockRequest(getTasks.deleteTask)
    .params({id: '59e4532c566c36829f9b22ab'})
    .end(async function() {
      let tasks = await getTasks.allTasks(stubResponse)
      expect(tasks.length).to.equal(dbRefillLength - 1)
    })
  })

  await it('should return the correct message', async function() {
    mockRequest(getTasks.deleteTask)
    .params({id: 'fake params'})
    .end(function(output) {
      expect(output).to.equal("Unable to find task with id: fake params")
    })
  })

  it('should save a new document to the database', async function() {
    await db.testData()
    mockRequest(getTasks.saveTask)
    .params({id: '1234'})
    .body({task: 'This is a new document.'})
    .end(async function(output) {
      expect(output).to.equal("SAVED: { __v: 0, _id: '1234', task: 'This is a new document.' }")
    })
  })

  it('should recognise an attempt to save a document without an id', async function() {
    let param = { body: { task: 'This is a document without an id.' },
                  params: {} }
    await getTasks.saveTask( param, stubResponse ).catch((err) => {
      expect(err.toString()).to.equal('Error: document must have an _id before saving')
    })
  })

  it('should find and update a document', async function() {
    await db.testData()
    await mockRequest(getTasks.updateTask)
    .params({id: '59e4547d566c36829f9b22ac', task: 'Start sketches for Mark IX armour.', isDone: 'false'})
    .end(function(output) {
      expect(output.nModified > 0).to.be.true
    })
  })


})
