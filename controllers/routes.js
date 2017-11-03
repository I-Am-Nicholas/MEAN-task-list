const express = require('express');
const router = express.Router();
var tasks = require('../models/tasks');

//Router CRUD

//ALL
router.get('/tasks', (req, res, next) => {
  tasks.allTasks(res)
});

//ONE
router.get('/task/:id', (req, res) => {
  tasks.oneTask(req, res)
});

module.exports = router;
