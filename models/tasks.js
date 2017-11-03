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
    err ? res.send(err) : res.json(tasks);
    return tasks;
  });
  return findTasks;
};

exports.oneTask = function(req, res){
  db.connect();
  let getParamId = req.params.id
  let findTask = Task.findOne( {_id: getParamId.toString() }, (err, task) => {
    err ? console.log('Oh no!') : res.send(task);
    return task
  });
  return findTask;
};
