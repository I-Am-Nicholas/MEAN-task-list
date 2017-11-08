const express = require('express') 
const router = express.Router()
var tasks = require('../models/tasks')

//Router CRUD

//ALL
router.get('/tasks', (req, res, next) => {
  tasks.allTasks(res)
})

//ONE
router.get('/task/:id', (req, res, next) => {
  tasks.oneTask(req, res)
})

//DELETE ONE
router.delete('/task/:id', (req, res, next) => {
  tasks.updateTask(req, res)
})


module.exports = router
