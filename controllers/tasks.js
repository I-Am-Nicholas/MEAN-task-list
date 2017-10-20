const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../db.js')

//SCHEMA
  var minlength = [1, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
  const testSchema = new mongoose.Schema ({
    _id: {type: String},
    task: { type: String, minlength: minlength },
    isDone: { type: Boolean }
  });

//MODEL
  if (typeof Task === 'undefined') {
    console.log('Task is undeclared. Declaring and assigning a model value.')
    Task = mongoose.model('Task', testSchema)
  }
  else {
    console.log('Already assigned a model value. Skipping re-assignment.')
  }


//READ: Get All Tasks
router.get('/tasks', (req, res, next) => {
  Task.find((err, tasks) => {
  err ? res.send(err) : res.json(tasks);
  });
});

//READ: Get Single Tasks
router.get('/task/:id', (req, res, next) => {
  let getParamId = req.params.id
  Task.findOne( {_id: getParamId.toString() }, (err, task) => {
  err ? res.send(err) : res.json(task);
  });
});


module.exports = router;
