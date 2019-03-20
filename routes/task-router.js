var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/task-controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/tasks', tasksController.createTask);

router.get('/tasks/:id', tasksController.getTaskById);

router.get('/tasks', tasksController.getTasks);

router.put('/tasks/:id/toggle_completion', tasksController.toggleTask);

router.delete('/tasks/:id', tasksController.deleteTask);

module.exports = router;
