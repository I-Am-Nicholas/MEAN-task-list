const chai = require('chai');
const expect  = require('chai').expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var db = require('../db');
const testData = require('./testData')

//MOCK HTTP RESPONSE
var httpMocks = require('node-mocks-http');
var stubResponse = httpMocks.createResponse({});

//ODM
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let connection = mongoose.connection;

//TEST DATABASE SCHEMA
var schema = require('../public/schemas/schema');
var testSchema = new mongoose.Schema(schema)

//CONTROLLER ACCESS
var getTasks = require( '../models/tasks');

//TESTS
describe('Database', function() {

  beforeEach( async function() {
    await db.testData();//await halts event loop until DB is fully populated.
  });

  afterEach(function(){
    db.wipe();
  })

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


});
