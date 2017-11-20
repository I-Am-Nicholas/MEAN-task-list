const mongoose = require('mongoose')

const async = require('async')
var schema = require('./public/schemas/schema')
var testSchema = new mongoose.Schema(schema)
const testData = require('./test/testData')

var append

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
exports.connect = async() => {
  await mongoose.connection.close()
  environmentSelector()
  let uri = 'mongodb://localhost/task-list'+append
  var connection = mongoose.connect(uri, (err) => {
    if (err) console.log("Custom DB Connection err msg(/db.js): "+ err)
  })
}

//CHECK MODEL STATE
let model = () => {
  if ( typeof Task === 'undefined' ) {
    Task = mongoose.model('Task', schema)
  }
}

//REMOVE COLLECTION(S)
exports.wipe = async() => {
  await Task.remove({}, (err) => {
  if (err){ console.log("Custom Task.remove error message: "+err)}
  console.log('\nCollection removed. Clean slate.')
  })
}

//SUPPLY COLLECTION DATA FROM JSON TO DB
exports.testData = async() => {
  model()
  let testTasks = testData.testTasks
  await exports.wipe()
  newModel(testTasks)
  console.log("Database populated by 'beforeEach' block.")
}

//CREATE NEW MODEL
let newModel = async(testTasks) => {
  await testTasks.forEach( (task) => {
    let tsk = new Task({ _id: task._id, task: task.task, isDone: task.isDone })
    exports.saver(tsk)
  })
}

//SAVE NEW MODEL TO DB
exports.saver = (tsk) => {
  tsk.save( (err, res) => {
    if (err){ return console.log("Custom testData/tsk.save message: "+err.errmsg) }
  })
}
