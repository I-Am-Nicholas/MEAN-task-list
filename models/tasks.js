const mongoose = require('mongoose');
const db = require('../db');

//SET SCHEMA
const schema = require('../public/schemas/schema');
const thisSchema = new mongoose.Schema(schema);

//DEFINE MODEL
if (typeof Task === 'undefined') {
  Task = mongoose.model('Task', thisSchema)
}

exports.allTasks = function(res) {
  db.connect();
  let findTasks = Task.find((err, tasks) => {
    err ? res.send(err) : res.send(tasks);
    return tasks;
  });
  return findTasks;
};

exports.oneTask = async function(req, res) {
  await db.connect();
  let getParamId = req.params.id
  await Task.findOne( {_id: getParamId.toString()} )
  .exec( (err, task) => {
    err ? console.log('Custom err msg from oneTask'+err) : res.send(task);
    return task
  });
};

exports.deleteTask = async function(req, res) {
  await db.connect();
  let getParamId = req.params.id
  await Task.findByIdAndRemove( getParamId.toString() )
  let t = await Task.find((err, tasks) => {
    err ? console.log('Custom deleteTask err msg: '+err) : tasks
  })
  await res.send("Deleted. Database now contains "+t.length+" tasks.")
}
