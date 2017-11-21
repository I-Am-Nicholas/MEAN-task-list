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
    if(task == null) {await res.send("Unable to find task: "+getParamId)}
    else {
      res.send(task)
    }
  })
}

exports.deleteTask = async function(req, res) {
  await db.connect()
  let getParamId = req.params.id
  return await Task.findOneAndRemove( {_id : getParamId}, async (err, task) => {
    if(err){console.log("Custom findOneAndRemove err msg: "+err)}
    if(task === null) {return res.send("Unable to find task: "+getParamId)}
    res.send("DELETED: "+ task)
  })
}

exports.saveTask = async function(req, res) {
  await db.connect()
  let getParams = req.params
  let tsk = new Task({_id: getParams.id, task: getParams.task})
  res.send("SAVED: "+ await db.saver(tsk))
}

exports.updateTask = async function(req, res) {
  let getParams = req.params
  await Task.findOne( {_id: getParams.id}, async (err, task) => {
    if (err) {console.log('Error in findOne: '+ err)}
    if(task == null) {await res.send("Unable to find task with id: "+getParams.id)}
    let updatedTask = await assignTaskProperties(getParams, task)
    res.send("SAVED: "+ await db.saver(updatedTask))
  })
}

let assignTaskProperties = (getParams, task) => {
  task.task = getParams.task || task.task
  task.isFalse = getParams.isFalse || task.isFalse
  return task
}
