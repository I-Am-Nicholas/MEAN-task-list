const mongoose = require('mongoose')
const async = require('async')
var schema = require('./public/schemas/schema');
var testSchema = new mongoose.Schema(schema);
const testData = require('./test/testData')


//DATABASE STATE
let state = {
  db: exports.connect
}

//DATABASE CONNECTION
exports.connect = (done) => {

  //SELECT ENVIRONMENT
  let append;
  process.env.NODE_ENV == 'Test' ? append = '-test' : append = '';

  let uri = 'mongodb://localhost/task-list'+append
  return mongoose.connect(uri, (err, db, done) => {
    if (err) return done(err)
    state.db = db
  })
  done()
};

//CHECK DATABASE STATE
exports.getDB = () => {
 return state.db
}

//SUPPLY COLLECTION DATA FROM JSON TO DB
exports.testData = () => {
  var db = exports.getDB;
  if (!db) {
    console.log("DB NOT Connected!")
    return (new Error('Database not connected.'))
  }
  else {
    Task.remove({}, (err) => {
     console.log('Collection removed. Clean slate.')
   });
  }

  var testTasks = testData.testTasks;
  testTasks.forEach( (task) => {
    let tsk = new Task({ _id: task._id, task: task.task });
    tsk.save( (err) => {
      if (err){ console.log(err.errmsg) }
      console.log("New data saved to DB.")
    });
  });

}
