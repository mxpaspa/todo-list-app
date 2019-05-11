const List = require('../models');
const expressValidator = require('express-validator');

module.exports = {
  createSubTask: function(req, res) {
    //TODO:Move the validation stuff to a different module
    // req.checkBody('listID', 'Please select which list you want to add your task to').notEmpty();
    // req.checkBody('taskID', 'Please select which task you want to add your task to').notEmpty();
    // req.checkBody('subTaskTitle', 'Please provide a name for your subtask').notEmpty();

    // req.getValidationResult().then(result => {
    //   if (!result.isEmpty()) {
    //     res.send({
    //       result: 'failed',
    //       message: `validation errors: ${util.inspect(result.array())}`
    //     });
    //   }
    // });

    const listID = req.body.listID;
    const taskID = req.body.taskID;
    const subTaskTitle = req.body.subTaskTitle;
    // const subTaskDescription = req.body.subTaskDescription;

    const newSubTask = {
      title: subTaskTitle,
      // description: subTaskDescription,
      completed: {
        status: 'pending'
      }
    };

    List.findById(listID)
      .then(list => {
        let task = list.tasks.id(taskID);
        task.subTasks.push(newSubTask);
        list.incomplete_count.subTasks += 1;
        list
          .save()
          .then(doc => {
            // let subTasks = doc.tasks.find(task => {
            //   if (task._id === taskID) {
            //     return task.subTasks;
            //   }
            // });

            //TODO: re-do this is terrible
            let newTask = doc.tasks.filter(sTask => sTask === task);
            res.send(newTask[0].subTasks[newTask[0].subTasks.length - 1]);
          })
          .catch(err => res.status(400).send(err + "  Coudln't save subtask"));
      })
      .catch(err => res.status(400).send(err));
  },

  showSubTasks: function(req, res) {
    const listID = req.query.listID;
    const taskID = req.query.taskID;

    List.findOne({ _id: listID })
      .then(list => {
        let subtasks = list.tasks.id(taskID).subTasks;
        res.send(subtasks);
      })
      .catch(err => res.status(422).send(err));
  },

  findSubTaskById: function(req, res) {
    let listID = req.query.listID;
    let taskID = req.query.taskID;
    let subtaskID = req.params.id;

    List.findById(listID)
      .then(list => {
        let doc = list.tasks.id(taskID).subTasks.id(subtaskID);
        res.send(doc);
      })
      .catch(err => res.status(422).send(err));
  },

  toggleSubTasks: function(req, res) {
    let listID = req.body.listID;
    let taskID = req.body.taskID;
    let subtaskID = req.params.id;

    List.findById(listID)
      .then(list => {
        let subTask = list.tasks.id(taskID).subTasks.id(subtaskID);
        if (subTask.completed.status == 'pending') {
          subTask.completed = { status: 'completed', completed_at: new Date() };
          list.incomplete_count.subTasks -= 1;
        } else {
          subTask.completed = { status: 'pending' };
          list.incomplete_count.subTasks += 1;
        }

        list.save().then(subTask => res.send(subTask));
      })
      .catch(err => res.status(400).send(err));
  },

  deleteSubTasks: function(req, res) {
    let subtaskID = req.params.subtaskID;
    let taskID = req.body.taskID;
    List.tasks
      .findByIdAndRemove(id)
      .then(id => res.send(id + 'deleted successfully'))
      .catch(err => res.statu(400).send(err));
  }
};
