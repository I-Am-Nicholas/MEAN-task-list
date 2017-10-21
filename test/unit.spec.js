const chai = require('chai');
const expect  = require('chai').expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var db = require('../db');

describe('Database', function() {

//ODM
  let mongoose = require('mongoose');
  mongoose.Promise = global.Promise;


  after(function(done) {
    db.connect().once('open', function() {
      console.log('Database connected.')
    });
    db.connect().dropDatabase(function() {
      console.log('Database dropped.\n')
    });
    db.connect().close(function() {
      console.log('Database disonnected.')
    });
    done();
  });


  describe('Validations', function() {

    it('should reject names less than one character long', function(done) {
      let testTask = new Task({task: ''});
      expect(testTask.validate()).to.be.rejected;
      done();
    });

  });


});
