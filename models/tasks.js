const mongoose = require('mongoose');
var connection = mongoose.connection;
const db = require('../db');

//SET SCHEMA
const schema = require('../public/schemas/schema');
const thisSchema = new mongoose.Schema(schema);

//DEFINE MODEL
if (typeof Task === 'undefined') {
  Task = mongoose.model('Task', thisSchema)
}


exports.allTasks = async function(res) {
  db.connect();
  let findTasks = Task.find((err, tasks) => {
    err ? res.send(err) : res.json(tasks);
    return tasks;
  });
  return findTasks;
};
