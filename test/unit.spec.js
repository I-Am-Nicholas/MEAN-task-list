const chai = require('chai');
const expect  = require('chai').expect;
const assert  = require('chai').assert;
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

//TEST DATABASE SCHEMA
var schema = require('../public/schemas/schema');
var testSchema = new mongoose.Schema(schema)

//MODEL ACCESS
var tasker = require( '../models/tasks');

//TESTS
describe('Database', function() {

  beforeEach(async function() {
    await db.connect();
    await db.testData(function(err){//await essential!
    });//Essential for initial population of DB
    await mongoose.connection.close();
  });

  after(async function() {
    await mongoose.connection.close();
  });


  var getTasks = tasker(null, stubResponse);

  it('should return the correct number of documents', function() {
    expect(getTasks.allTasks()).to.have.lengthOf(3)
  });

});
