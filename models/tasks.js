const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = require('../db')

//SET SCHEMA
const schema = require('../public/schemas/schema')
const thisSchema = new mongoose.Schema(schema)

//DEFINE MODEL
if (typeof Task === 'undefined') {
  Task = mongoose.model('Task', thisSchema)
}

exports.allTasks = async function(res) {
  await db.connect();
  return Task.find((err, tasks) => {
    err ? res.send(err) : res.send(tasks);
  })
}

exports.oneTask = async function(req, res) {
  await db.connect()
  let getParamId = req.params.id
  await Task.findOne( {_id: getParamId}, async (err, task) => {
    if (err) {console.log('Error in findOne: '+ err)}
    await res.send(task)
  })
}

exports.deleteTask = async function(req, res) {
  await db.connect();
  let getParamId = req.params.id
  await Task.findOneAndRemove( {_id : getParamId}, async (err, task) => {
    if(err){console.log("Custom findOneAndRemove err msg: "+err)}
    if(task === null){res.send("Unable to find task: "+getParamId)}
    else {
      await dbSize(res)
    }
  })
}

let dbSize = (res) => {
  return Task.find((err, tasks) => {
    err ? console.log('Custom deleteTask err msg: '+err) : tasks
  }).then(async tasks => {
    await res.send("Database now contains "+tasks.length+" tasks.")
  })
}
