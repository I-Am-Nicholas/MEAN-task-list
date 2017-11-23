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
  await db.connect()
  return Task.find((err, tasks) => {
    if (err) {console.log("Task.find custom err msg: "+ err)}
    res.send(tasks)
  })
}

exports.oneTask = async function(req, res) {
  await db.connect()
  let getParamId = req.params.id
  await Task.findOne( {_id: getParamId}, async (err, task) => {
    if (err) {console.log('Error in findOne: '+ err)}
    if(task == null) {await res.send(badIDMessage(getParamId))}
    else {
      res.send(task)
    }
  })
}

exports.deleteTask = async function(req, res) {
  await db.connect()
  let getParams = req.params
  return await Task.findOneAndRemove( {_id : getParams.id}, async (err, task) => {
    if(err){console.log("Custom findOneAndRemove err msg: "+err)}
    if(task === null) {return res.send(badIDMessage(getParams.id))}
    res.send("DELETED: "+ task)
  })
}

exports.saveTask = async function(req, res) {
  await db.connect()
  let tsk = new Task({_id: req.params.id, task: req.body.task})
  res.send("SAVED: "+ await db.saver(tsk))
}

exports.updateTask = async function(req, res) {
  await db.connect()
  await Task.update(req.params, function(err, result) {
    if(err){res.send(err)}
    res.send(result)
  })
}

let badIDMessage = function(id) {
  return "Unable to find task with id: " + id
}
