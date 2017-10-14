const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://nicholas:nicholas@ds115085.mlab.com:15085/mean-task', ['tasks'])

//READ: Get All Tasks
router.get('/tasks', (req, res) => {
  db.tasks.find((err, tasks) => {
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

module.exports = router;
