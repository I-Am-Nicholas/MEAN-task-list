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


describe('Database', function() {

  beforeEach(async function() {

    await db.testData(function(){//await essential!
      console.log("Database populated.")
    });//Essential for initial population of DB

  });

  after(async function() {
    await mongoose.connection.close();
  });


  let getTasks = new tasker(null, stubResponse, function(err, tasks){
    if(err) {console.log('Custom getTasks error msg: ', err)}
  });


  it('should return the correct number of documents', function() {
    expect(getTasks.tasks).to.have.lengthOf(3)
  });


});
