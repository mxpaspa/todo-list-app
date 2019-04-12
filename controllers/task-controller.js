const List = require('../models');

module.exports = {
  createTask: function(req, res) {
    //Move the validation stuff to a different module
    req.checkBody('listID', 'Please select which list you want to add your task to').notEmpty();
    req.checkBody('taskTitle', 'Please provide a name for your task').notEmpty();

    req
      .getValidationResult()
      .then(result => {
        if (!result.isEmpty()) {
          res.send({
            result: 'failed',
            message: `validation errors: ${util.inspect(result.array())}`
          });
        }
      })
      .catch(err => console.log(err));
    const listID = req.body.listID;
    const taskTitle = req.body.taskTitle;
    const taskDescription = req.body.taskDescription;

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      completed: {
        status: 'pending'
      },
      previousTaskState: ''
    };

    // List.findById(listID)
    //   .then(list => {
    //     list.tasks.push(newTask);
    //     list.incomplete_count.tasks += 1;
    //     return list.save();
    //   })
    //   .then(task => res.send(task))
    //   .catch(err => res.status(404).send(err));
    let query = { _id: listID };
    let update = { $push: { tasks: newTask } };
    let options = { new: true };
    List.findOneAndUpdate(query, update, options, (err, doc) => {
      if (err) {
        throw err;
      }
      // let tasks = doc.tasks[tasks.length - 1];
      res.send(doc.tasks[doc.tasks.length - 1]);
    });
    // .then(task => res.send(task))
    // .catch(err => res.status(404).send(err));
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
      //TODO: correct error here ?
      .catch(err => res.status(422).send(err));
  },

  //TODO: check the callback pattern here
  deleteTask: function(req, res) {
    let taskID = req.params.id;
    let listID = req.body.listID;
    List.findById(listID)
      .then(list => {
        list.tasks.id(taskID).remove();
        return list.save();
      })
      .then(doc => res.send(doc))
      .catch(err => res.status(422).send(err));
  },

  toggleTask: function(req, res) {
    let listID = req.body.listID;
    let taskID = req.params.id;

    //TODO: reading back the entire list here, not sure if that's desireable
    //TODO: the instance method is not working as desired-the response still sends back previousState
    //TODO:
    //TODO: there is no error being thrown here, when the wrong task id is being passed into the url
    List.findById(listID)
      .then(list => {
        let task = list.tasks.id(taskID);

        if (task.completed.status == 'completed') {
          const restoredTaskState = JSON.parse(task.previousTaskState);
          const restoredListState = JSON.parse(list.previousState);

          task.title = restoredTaskState.title;
          task.completed = restoredTaskState.completed;
          task.subTasks = restoredTaskState.subTasks;
          list.incomplete_count.tasks = restoredListState.incomplete_count.tasks;
          list.incomplete_count.subTasks = restoredListState.incomplete_count.subTasks;
          // list.incomplete_count.tasks = list.previousState.incomplete_count
        } else if (task.completed.status == 'pending') {
          task.previousState = '';
          const previousTaskState = JSON.stringify(task);
          const previousListState = JSON.stringify(list);

          list.previousState = previousListState;
          task.previousTaskState = previousTaskState;

          task.completed = { status: 'completed', completed_at: new Date() };
          list.incomplete_count.tasks -= 1;

          task.subTasks.forEach(subTask => {
            if (subTask.completed.status == 'pending') {
              list.incomplete_count.subTasks -= 1;
              subTask.completed = { status: 'completed', completed_at: new Date() };
            }
          });
        }

        // list.toJSON();
        return list.save();
      })
      .then(list => {
        res.send(list + ' List saved to database');
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
