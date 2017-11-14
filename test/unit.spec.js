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
mongoose.Promise = global.Promise
let connection = mongoose.connection

//TEST DATABASE SCHEMA
var schema = require('../public/schemas/schema')
var testSchema = new mongoose.Schema(schema)

//MODEL ACCESS
var getTasks = require( '../models/tasks')

//TESTS
describe('DATABASE\n', async function() {

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
    expect(tasks).to.have.lengthOf(testData.testTasks.length)
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
      expect(response).to.equal("Unable to find task: fake id")
    })
  })

  await it('should find and delete the correct document', async function() {
    mockRequest(getTasks.deleteTask)
    .params({id: '59e4532c566c36829f9b22ab'})
    .end(function(output) {
      expect(output).to.equal("2 documents remaining in database.")
    })
    await getTasks.dbSize()//essential. Don't yet know why.
  })

  await it('should return the correct message', async function() {
    mockRequest(getTasks.deleteTask)
    .params({id: 'fake params'})
    .end(function(output) {
      expect(output).to.equal("Unable to find task: fake params")
    })
    await getTasks.dbSize()//essential. Don't yet know why.
  })

})
