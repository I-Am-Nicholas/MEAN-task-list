const chai = require('chai');
const expect  = require('chai').expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const db = require('../db.js');

describe('Database', () => {

//ODM
  var mongoose = require('mongoose');
  mongoose.Promise = global.Promise;


  after((done) => {
    db.once('open', () => {
      console.log('Database Connected.')
    });
    db.dropDatabase(() => {
      console.log('Database dropped.')
    });
    db.close(() => {
      console.log('Connection closed.')
    });
    done();
  });


  describe('Validations', () => {

    it('should reject names less than one character long', (done) => {
      let testTask = new Task({task: ''});
      expect(testTask.validate()).to.be.rejected;
      done();
    });

  });


});
