const express = require('express');
const router = express.Router();
var tasks = require('../models/tasks');

//Router CRUD
router.get('/tasks', (req, res, next) => {
  tasks.allTasks(res)
});
