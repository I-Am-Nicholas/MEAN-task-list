const mongoose = require('mongoose');
const db = require('../db');

//SET SCHEMA
const schema = require('../public/schemas/schema');
const thisSchema = new mongoose.Schema(schema);

//DEFINE MODEL
if (typeof Task === 'undefined') {
  Task = mongoose.model('Task', thisSchema)
}

//EXPORT MODULE
module.exports = taskPortal = (err, res, next) => {

  alt();
  function alt() {
    var innerAlt = function(){
      db.connect();
      Task.find((err, tasks) => {
        err ? res.send(err) : res.json(tasks)
        this.tasks = tasks;
      })
      return this.tasks;
    };
    return innerAlt();
  };

  return {
    allTasks: alt
  }

};
