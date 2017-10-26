const mongoose = require('mongoose');
const db = require('../db');

//SET SCHEMA
const schema = require('../public/schemas/schema');
const thisSchema = new mongoose.Schema(schema);

//DEFINE MODEL
if (typeof Task === 'undefined') {
  Task = mongoose.model('Task', thisSchema)
}

module.exports = allTasks = function(err, res, next) {
  db.connect();
  Task.find((err, tasks) => {
    (err) ? res.send(err) : res.json(tasks)
    this.tasks = tasks;
  });
};
