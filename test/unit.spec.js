const chai = require('chai');
const expect  = require('chai').expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var db = require('../db');


//ODM
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Test Schema
var schema = require('../public/schemas/schema');
var testSchema = new mongoose.Schema(schema)


describe('Database', function() {

  afterEach(function(done) {
    mongoose.connection.close(function(err) {
      if (err) return (err)
    });
    done();
  });

  //MODEL
  if (typeof Task === 'undefined') {
    console.log('Mongoose model has not yet been created.\nAssigning to a variable now.')
    Task = mongoose.model('Task', testSchema)
  }
  else {
    console.log('Already assigned to a variable.\nSkipping re-assignment.')
  }


  it('should reject names less than one character long', function(done) {
    let testTask = new Task({task: ''});
    expect(testTask.validate(function(err, res){
      if (err) return (err)
    }).then(function(err, res){
      if (err) return (err)
    })).to.be.rejected
    done();
  });

  it('should have one document in the database', function(done){

    var promise = mongoose.connect('localhost/task-list-test', function(err, done){
      useMongoClient: true
    }).then(function(err){
      if (err) return (err)
      console.log('Database connected')
    }, done)

    var huntKR = new Task({_id: 6, task: 'Hunt down KillerRabbit'});
      huntKR.save(function(err) {
      if (err) return (err)
    });

    Task.find({_id: 6},function(err, doc){
      if (err) return (err)
      expect(doc[0].task).to.equal('Hunt down KillerRabbit')
    });
    done()
  });

});
