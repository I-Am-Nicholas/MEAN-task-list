const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost/task-list-test', ['tasks'])

//READ: Get All Tasks
router.get('/tasks', (req, res) => {
  console.log(db)
  db.tasks.find((err, tasks) => {
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

module.exports = router;
