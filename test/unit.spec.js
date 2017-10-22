const chai = require('chai');
const expect  = require('chai').expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var db = require('../db');
const testData = require('./testData')

//ODM
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Test Schema
var schema = require('../public/schemas/schema');
var testSchema = new mongoose.Schema(schema)


describe('Database', function() {

  beforeEach(function(done){

    mongoose.connect('mongodb://localhost/task-list-test', {
       useMongoClient: true,
       promiseLibrary: global.Promise
    });

    db.testData(function(){
      console.log("Database populated.")
    });//ESSENTIAL for initial population of DB

    done()
  });

  afterEach(function() {
      mongoose.connection.close(function(){
    });
  });


  it('should reject names less than one character long', function(done) {
    let testTask = new Task({task: ''});
    expect(testTask.validate(function(err, res, done){
    }).then(function(err, res){
      if (err) return done(err)
    })).to.be.rejected
    done();
  });

  it('should have a specific document in the database', function(){
    setTimeout(function(){
      Task.find({_id: '59e4532c566c36829f9b22ab'},function(err, doc){
      if (err) return done(err)
      let task = testData.testTasks[0].task;
      expect(doc[0].task).to.equal(task)
    });
  }, 1000);
  });

});
