const express = require('express');

const tasksController = require('../controllers/tasks.controller');

const router = express.Router();

// Endpoint for getting all the tasks
router.get('', tasksController.getTasks);

// Endpoint for creating a new task
router.put('/new', tasksController.createTask);

// Endpoints for updating and deleting a tasks by a given id
router.route('/:id').patch(tasksController.updateTask).delete(tasksController.deleteTask);

// Endpoint for searching a task with regex
router.get('/task', tasksController.findTask);

module.exports = router;
