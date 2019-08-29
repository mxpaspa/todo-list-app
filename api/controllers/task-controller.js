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

    let query = { _id: listID };
    let update = { $push: { tasks: newTask } };
    let options = { new: true };
    List.findOneAndUpdate(query, update, options, (err, doc) => {
      if (err) {
        throw err;
      }
      //TODO:
      // doc.task_incomplete = doc.tasks.length;
      let incompleteTasks = doc.tasks.filter(task => task.completed.status == 'pending');
      // console.log(incompleteTasks.length);
      doc.task_incomplete = incompleteTasks.length;
      doc.save();

      res.send(doc.tasks[doc.tasks.length - 1]);
    });
  },

  getTasks: function(req, res) {
    listID = req.query.listID;
    List.findById(listID)
      .then(list => res.send(list.tasks))
      .catch(err => res.status(422).send(err + 'Unable to retrieve tasks'));
  },

  getIncompleteTaskCount: function(req, res) {
    listID = req.query.listID;
    List.findById(listID)
      .then(list => res.send(String(list.tasks.length)))
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
        // console.log(list.tasks.length);
        // .then(list => (list.task_incomplete = list.tasks.length));
        list.task_incomplete = list.tasks.length;
        console.log(list.task_incomplete);
        return list.save();
      })

      .then(doc => res.send(doc))
      .catch(err => res.status(422).send(err));
  },

  editTaskTitle: function(req, res) {
    let listID = req.body.listID;
    let taskID = req.params.id;
    let newTitle = req.body.newTitle;

    List.findById(listID)
      .then(list => {
        let task = list.tasks.id(taskID);
        task.title = newTitle;
        return list.save();
      })
      .then(list => {
        let task = list.tasks.filter(task => task.id === taskID);
        res.send(task[0]);
      })
      .catch(err => res.status(422).send(err));
  },

  toggleTask: function(req, res) {
    let listID = req.body.listID;
    let taskID = req.params.id;
    //TODO: reading back the entire list here, not sure if that's desireable
    //TODO: the instance method is not working as desired - the response still sends back previousState
    //TODO: there is no error being thrown here when the wrong task id is being passed into the url
    List.findById(listID)
      .then(list => {
        let task = list.tasks.id(taskID);

        if (task.completed.status == 'completed') {
          const restoredTaskState = JSON.parse(task.previousTaskState);
          const restoredListState = JSON.parse(list.previousState);

          list.task_incomplete = restoredListState.task_incomplete;
          task.title = restoredTaskState.title;
          task.completed = restoredTaskState.completed;

          task.subTasks = restoredTaskState.subTasks;
          // list.task_incomplete = restoredListState.task_incomplete;
          // list.incomplete_count.subTasks = restoredListState.incomplete_count.subTasks;

          // If the task is pending, then change to completed
        } else if (task.completed.status == 'pending') {
          task.previousState = '';
          const previousTaskState = JSON.stringify(task);
          const previousListState = JSON.stringify(list);

          list.previousState = previousListState;
          task.previousTaskState = previousTaskState;
          task.completed = { status: 'completed', completed_at: new Date() };
          task.subTasks.forEach(subTask => {
            if (subTask.completed.status == 'pending') {
              subTask.completed = { status: 'completed', completed_at: new Date() };
            }
          });

          //TODO: funcitonalize this
          let incompleteTasks = list.tasks.filter(task => task.completed.status == 'pending');
          console.log(incompleteTasks.length);
          list.task_incomplete = incompleteTasks.length;
        }
        return list.save();
      })
      .then(list => {
        let task = list.tasks.filter(task => task.id === taskID);
        res.send(task[0]);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
