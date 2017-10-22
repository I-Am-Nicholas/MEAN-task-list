const mongoose = require('mongoose')
const async = require('async')
var schema = require('./public/schemas/schema');
var testSchema = new mongoose.Schema(schema);

//DATABASE STATE
let state = {
  db: exports.connect
}

//DATABASE CONNECTION
exports.connect = (done) => {
  if (state.db) return
  //SELECT ENVIRONMENT
  let append;
  process.env.NODE_ENV == 'Test' ? append = '-test' : append = '';

  let uri = 'mongodb://localhost/task-list'+append
  return mongoose.connection.openUri(uri, (err, db, done) => {
    if (err) return done(err)
    state.db = db
  })
  done()
};


//CHECK DATABASE STATE
exports.getDB = () => {
 return state.db
}


//SUPPLY COLLECTION DATA
exports.testData = (done) => {
  var db = state.db
  if (!db) {
    return done(new Error('Database not connected.'))
  }

}
