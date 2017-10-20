const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
var db;
var append;

if (process.env.NODE_ENV == 'Test')
  append = '-test';
else
  append = '';

db = mongojs('mongodb://localhost/task-list'+append, ['tasks'])

//READ: Get All Tasks
router.get('/tasks', (req, res) => {
  db.tasks.find((err, tasks) => {
  err ? res.send(err) : res.json(tasks);
  });
});

//READ: Get Single Tasks
router.get('/task/:id', (req, res, next) => {
  let getParamId = mongojs.ObjectId(req.params.id)
  db.tasks.findOne( {_id: getParamId.toString() }, (err, task) => {
  err ? res.send(err) : res.json(task);
  });
});

module.exports = router;
