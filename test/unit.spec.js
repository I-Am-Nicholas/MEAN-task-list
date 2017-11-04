const chai = require('chai');
const expect  = require('chai').expect;
const assert  = require('chai').assert;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var db = require('../db');
const testData = require('./testData')

//MOCK HTTP RESPONSE + REQUEST
var httpMocks = require('node-mocks-http');
var stubResponse = httpMocks.createResponse({});
var mockRequest = require('dupertest');

//ODM
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let connection = mongoose.connection;

//TEST DATABASE SCHEMA
var schema = require('../public/schemas/schema');
var testSchema = new mongoose.Schema(schema)

//MODEL ACCESS
var getTasks = require( '../models/tasks');

//TESTS
describe('DATABASE\n', function() {

  beforeEach( async function() {
    await db.testData();//await halts event loop until DB is fully wiped, then populated.
  });

  after(async function() {
    await mongoose.connection.close();
    connection.on('disconnected', function() {
    })
    console.log('DB Disconnected')
  });


  it('should return the correct number of documents', async function() {
    let tasks = await getTasks.allTasks(stubResponse);
    expect(tasks).to.have.lengthOf(3)
  });

  it('should return the correct document', async function() {
    await mockRequest(getTasks.oneTask)
    .params({id: '59e4547d566c36829f9b22ac'})
    .end( function(response) {
      expect(response.task).equal('Take Mark VII for test flight.')
    });
  });


});
