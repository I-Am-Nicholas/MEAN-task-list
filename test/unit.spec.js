const chai = require('chai');
const expect  = require('chai').expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const request = require('supertest');


describe('Database', () => {

//ODM
  var mongoose = require('mongoose');
  mongoose.Promise = global.Promise;

//SCHEMA
  var minlength = [1, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
  const testSchema = new mongoose.Schema ({
    task: { type: String, minlength: minlength },
    isDone: { type: Boolean }
  });

//MODEL
  if (typeof Task === 'undefined') {
    console.log('Task is undeclared. Declaring and assigning a model value.')
    Task = mongoose.model('Task', testSchema)
  }
  else {
    console.log('Already assigned a model value. Skipping re-assignment.')
  }

  mongoose.connection.openUri('mongodb://localhost/task-list-test')
  var db = mongoose.connection;


  after((done) => {
    db.once('open', () => {
      console.log('Database Connected.')
    });
    db.dropDatabase(() => {
      console.log('Database dropped.')
    });
    db.close(() => {
      console.log('Connection closed.')
      done();
    });
  });


  describe('Validations', () => {
    it('should reject names less than one character long', () => {
      let testTask = new Task({task: ''});
      return expect(testTask.validate()).to.be.rejected;
    });
  });


});
