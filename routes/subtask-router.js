var express = require('express');
var router = express.Router();
var subTaskController = require('../controllers/subtask-controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/subtasks', subTaskController.createSubTask);

router.get('/subtasks/:id', subTaskController.findSubTaskById);

router.get('/subtasks', subTaskController.showSubTasks);

router.put('/subtasks/:id/toggle_completion', subTaskController.toggleSubTasks);

router.delete('subtasks/:id/', subTaskController.deleteSubTasks);

module.exports = router;
