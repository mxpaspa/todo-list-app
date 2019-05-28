var express = require('express');
var router = express.Router();
var listController = require('../controllers/list-controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/lists', listController.createList);

router.get('/lists/:id', listController.findListById);

router.get('/lists', listController.showLists);

router.put('/lists/:id/toggle_completion', listController.toggleList);

router.put('/lists/:id/edit_title', listController.editTitle);

router.delete('/lists/:id', listController.deleteList);

module.exports = router;
