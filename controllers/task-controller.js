const List = require('../models');
const expressValidator = require('express-validator');

module.exports = {
  createTask: function(req, res) {
    //Move the validation stuff to a different module
    req.checkBody('listID', 'Please select which list you want to add your task to').notEmpty();
    req.checkBody('taskTitle', 'Please provide a name for your task').notEmpty();

    req.getValidationResult().then(result => {
      if (!result.isEmpty()) {
        res.send({
          result: 'failed',
          message: `validation errors: ${util.inspect(result.array())}`
        });
      }
    });
    const listID = req.body.listID;
    const taskTitle = req.body.taskTitle;
    const taskDescription = req.body.taskDescription;

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      completed: {
        status: 'pending'
      }
    };

    List.findById(listID)
      .then(list => {
        list.tasks.push(newTask);
        list.incomplete_count.tasks += 1;
        list
          .save()
          .then(task => res.send(task + ' Task was successfully added'))
          .catch(err => res.status(400).send(err + '  Failed to save task'));
      })
      .catch(err => res.status(400).send(err));
  },

  getTasks: function(req, res) {
    listID = req.query.listID;
    // taskID = req.query.listID;
    List.findById(listID)
      .then(list => res.send(list.tasks))
      .catch(err => res.status(422).send(err + 'Unable to retrieve tasks'));
  },

  getTaskById: function(req, res) {
    let taskID = req.params.id;
    let listID = req.query.listID;
    List.findById(listID)
      .then(list => {
        let doc = list.tasks.id(taskID);
        res.send(doc);
      })
      .catch(err => res.status(422).send(err));
  },

  deleteTask: function(req, res) {
    let taskID = req.params.id;
    let listID = req.body.listID;
    List.findById(listID).then(list => {
      list.tasks.id(taskID).remove();
      list
        .save()
        .then(doc => res.send(doc))
        .catch(err => res.status(422).send(err));
    });
  },

  toggleTask: function(req, res) {
    let listID = req.body.listID;
    let taskID = req.params.id;

    List.findById(listID).then(list => {
      let task = list.tasks.id(taskID);

      if (task.completed.status == 'completed') {
        const restoredState = JSON.parse(list.previousState);
        list.title = restoredState.title;
        list.completed = restoredState.completed;
        list.tasks = restoredState.tasks;
        list.incomplete_count = restoredState.incomplete_count;
      } else if (task.completed.status == 'pending') {
        list.previousState = '';
        const previousState = JSON.stringify(list);
        list.previousState = previousState;

        task.completed = { status: 'completed', completed_at: new Date() };
        list.incomplete_count.tasks = 0;
        list.incomplete_count.subTasks = 0;
        task.subTasks.forEach(subTask => {
          if (subTask.completed.status == 'pending') {
            subTask.completed = { status: 'completed', completed_at: new Date() };
          }
        });
      }

      list
        .save()
        .then(list => {
          res.send(list + ' List saved to database');
        })
        .catch(err => {
          res.status(400).send(err);
        });
    });
  }
};
