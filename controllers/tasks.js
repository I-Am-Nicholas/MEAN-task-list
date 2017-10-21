const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var db = require('../db.js')

//SCHEMA
  const minlength = [1, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
  const schema = new mongoose.Schema ({
    _id: {type: String},
    task: { type: String, minlength: minlength },
    isDone: { type: Boolean }
  });

//MODEL
  if (typeof Task === 'undefined') {
    console.log('Mongoose model has not been created.\nAssigning to a variable now.')
    Task = mongoose.model('Task', schema)
  }
  else {
    console.log('Already assigned to a variable.\nSkipping re-assignment.')
  }

//READ: Get All Tasks
router.get('/tasks', (req, res, next) => {
  db.connect();
  Task.find((err, tasks) => {
  err ? res.send(err) : res.json(tasks);
  });
});

//READ: Get Single Tasks
router.get('/task/:id', (req, res, next) => {
  db.connect();
  let getParamId = req.params.id
  Task.findOne( {_id: getParamId.toString() }, (err, task) => {
  err ? res.send(err) : res.json(task);
  });
});

module.exports = router;
