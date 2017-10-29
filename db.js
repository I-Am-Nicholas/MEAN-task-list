const mongoose = require('mongoose')
const async = require('async')
var schema = require('./public/schemas/schema');
var testSchema = new mongoose.Schema(schema);
const testData = require('./test/testData')

var append;

//DATABASE STATE
let state = {
  db: null
}

//SELECT ENVIRONMENT
let environmentSelector = () => {
  if (process.env.NODE_ENV == 'Test') {
    append = '-test'
    schema = testSchema
  }
  else {
    append = ''
  }
}

//CONNECT DATABASE
exports.connect = (done) => {

  environmentSelector();

  let uri = 'mongodb://localhost/task-list'+append

  if( state.db === null ) {
    return mongoose.connect(uri, (err, db, done) => {
      if (err) {console.log("Custom Database Connection error message(/db.js): "+ err)}
      state.db = 'db'
    })
    done()
  };

};

//CHECK MODEL STATE
  let model = () => {
    if ( typeof Task === undefined ) {
      Task = mongoose.model('Task', schema)
    }
  }

//SUPPLY COLLECTION DATA FROM JSON TO DB
exports.testData = () => {
  model()
  Task.remove({}, (err) => {
    if (err){ console.log("Custom Task.remove error message: "+err)}
    console.log('Collection removed. Clean slate.')
  });

  let testTasks = testData.testTasks;

  testTasks.forEach( (task) => {
    let tsk = new Task({ _id: task._id, task: task.task });
    tsk.save( (err) => {
      if (err){ console.log("Custom testData/tsk.save message: "+err.errmsg) }
    });
  });
  console.log("Database populated.")
};
