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
    err ? res.send(err) : res.send(tasks)
  })
}

exports.oneTask = async function(req, res) {
  await db.connect()
  let getParamId = req.params.id
  await Task.findOne( {_id: getParamId}, async (err, task) => {
    if (err) {console.log('Error in findOne: '+ err)}
    if(task == null) {await res.send("Unable to find task: "+getParamId)}
    else {
      await res.send(task)
    }
  })
}

exports.deleteTask = async function(req, res) {
  await db.connect()
  let getParamId = req.params.id
  return await Task.findOneAndRemove( {_id : getParamId}, async (err, task) => {
    if(err){console.log("Custom findOneAndRemove err msg: "+err)}
    if(task === null) {return res.send("Unable to find task: "+getParamId)}
    let dbs = await exports.dbSize(res)
    res.send(await dbs.length + " documents remaining in database.")
  })
}

exports.dbSize = async function(res) {
  let x = await Task.find((err, tasks) => {
    if (err) {console.log("Task.find custom err msg: "+ err)}
  })
  return x
}
