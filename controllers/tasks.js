const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var db = require('../db.js');
var schema = require('../public/schemas/schema');
var thisSchema = new mongoose.Schema(schema)

//MODEL
  if (typeof Task === 'undefined') {
    Task = mongoose.model('Task', thisSchema)
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
