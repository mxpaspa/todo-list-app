//TODO: test the db stuff by adding a record then finding a record with the same ID
//TODO: use the correct error codes and messages in all rejected promises
//TODO: conver this to ansyc/await
//TODO: determine which errors need to be console.logged and which need to be sent to the client

const express = require('express');
const expressValidator = require('express-validator');
const app = express();
const PORT = process.env.PORT || 5000;
const List = require('./models');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const util = require('util');

app.set('PORT', PORT);
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let uri = 'mongodb://paspam:smashingBoxes9@ds117866.mlab.com:17866/sb-todo-app';
var options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
};

//TODO: put the DB related code in a seperate file
mongoose.connect(uri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/**
 * List Routes
 */
app.post('/tasks', (req, res) => {
  //Move the validation stuff to a different module
  req.check('listID', 'Please select which list you want to add your task to').notEmpty();
  req.checkBody('taskTitle', 'Please provide a name for your task').notEmpty();
  //TODO: this works, but still getting an unhandled promise error in the console
  //TODO: do I need this ?
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
  //TODO: use this, or findOneAndUpdate here ?
  List.findById(listID)
    .then(list => {
      list.tasks.push(newTask);
      list.incomplete_count.tasks += 1;
      list
        .save()
        .then(doc => res.send(doc + ' task was added'))
        .catch(err => res.status(400).send(err + "  couldn't save task"));
    })
    .catch(err => res.status(400).send(err + "couldn't find that list"));
});

app.get('/tasks', (req, res) => {
  listID = req.query.listID;
  taskID = req.query.listID;
  List.findById(listID)
    .then(list => res.send(list.tasks))
    .catch(err => res.status(400).send(err + 'unable to lists tasks'));
});

app.get('/tasks/:id', (req, res) => {
  let taskID = req.params.id;
  let listID = req.query.listID;
  List.findById(listID)
    .then(list => {
      let doc = list.tasks.id(taskID);
      res.send(doc);
    })
    .catch(err => res.status(400).send(err + "couldn't find that list"));
});

app.delete('/tasks/:id', (req, res) => {
  let id = req.params.id;
  List.tasks
    .findByIdAndRemove(id)
    .then(id => res.send(id + 'deleted successfully'))
    .catch(err => res.statu(400).send(err));
});

app.put('/tasks/:id/toggle_completion', (req, res) => {
  //TODO: change this to use findOneAndUpdate possibly ?
  //TODO: need to catch the err from the callback
  let listID = req.body.listID;
  let taskID = req.params.id;

  //TODO: use find by id here
  List.findOne({ _id: listID }, (err, list) => {
    let task = list.tasks.id(taskID);

    if (task.completed.status == 'pending') {
      task.completed = { status: 'completed', completed_at: new Date() };
      list.incomplete_count.tasks -= 1;
      task.subTasks.forEach(subTask => {
        if (subTask.completed.status == 'pending') {
          subTask.completed = { status: 'completed', completed_at: new Date(), toggled_all: true };
          list.incomplete_count.subTasks -= 1;
        }
      });
    } else if (task.completed.status == 'completed') {
      task.completed = { status: 'pending' };
      list.incomplete_count.tasks += 1;
      task.subTasks.forEach(subTask => {
        if (subTask.completed.toggled_all == true && subTask.completed.status == 'completed') {
          subTask.completed = { status: 'pending', toggled_all: false };
          list.incomplete_count.subTasks += 1;
        }
      });
    }

    list
      .save()
      .then(list => {
        res.send(list + 'item saved to database');
      })
      .catch(err => {
        res.status(400).send(err + 'unable to save to database');
      });
  });
});

/**
 * List Routes
 */
app.post('/lists', (req, res) => {
  //TODO: add list title validation here
  let listTitle = req.body.listTitle;

  const newList = new List({
    title: listTitle,
    completed: { status: 'pending' },
    incomplete_count: { tasks: 0, subTasks: 0 }
  });
  newList
    .save()
    .then(item => {
      res.send(item + 'item saved to database');
    })
    .catch(err => {
      res.status(400).send(err + 'unable to save to database');
    });
});

app.get('/lists', (req, res) => {
  List.find({})
    .lean()
    .then(tasks => res.send(tasks))
    .catch(err => res.status(400).send(err + 'unable to lists tasks'));
});

app.get('/lists/:id', (req, res) => {
  let id = req.params.id;
  List.findById(id)
    .then(list => res.send(list))
    .catch(err => res.status(400).send(err + ' could not find that list'));
});

app.put('/lists/:id/toggle_completion', (req, res) => {
  //TODO: need a catch here for findById ?
  let id = req.params.id;
  List.findById(id).then(list => {
    if (list.completed.status == 'pending') {
      list.completed = { status: 'completed', completed_at: new Date() };
      list.tasks.forEach(task => {
        if (task.completed.status == 'pending') {
          task.completed = { status: 'completed', completed_at: new Date(), toggled_all: true };
          list.incomplete_count.tasks -= 1;
          task.subTasks.forEach(subTask => {
            if (subTask.completed.status == 'pending') {
              subTask.completed = {
                status: 'completed',
                completed_at: new Date(),
                toggled_all: true
              };
              list.incomplete_count.subTasks -= 1;
            }
          });
        }
      });
    } else if (list.completed.status == 'completed') {
      list.completed = { status: 'pending' };
      list.tasks.forEach(task => {
        if (task.completed.toggled_all == true && task.completed.status == 'completed') {
          task.completed = { status: 'pending', toggled_all: false };
          list.incomplete_count.tasks += 1;
          task.subTasks.forEach(subTask => {
            if (subTask.completed.toggled_all == true && subTask.completed.status == 'completed') {
              subTask.completed = { status: 'pending', toggled_all: false };
              list.incomplete_count.subTasks += 1;
            }
          });
        }
      });
    }

    list
      .save()
      .then(list => res.send(list))
      .catch(err => res.status(204).send(err));
  });
});

app.delete('/lists/:id', (req, res) => {
  let id = req.params.id;
  List.findByIdAndRemove(id)
    .then(doc => res.send(doc + 'list deleted successfully'))
    .catch(err => res.statu(400).send(util.inspect(err)));
});

/**
 * Subtask Routes
 */
app.post('/subtasks', (req, res) => {
  //Move the validation stuff to a different module
  req.checkBody('listID', 'Please select which list you want to add your task to').notEmpty();
  req.checkBody('taskID', 'Please select which task you want to add your task to').notEmpty();
  req.checkBody('subTaskTitle', 'Please provide a name for your subtask').notEmpty();
  //TODO: this works, but still getting an unhandled promise error in the console

  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      res.send({
        result: 'failed',
        message: `validation errors: ${util.inspect(result.array())}`
      });
    }
  });
  //TODO: use listID here instead
  const listID = req.body.listID;
  const taskID = req.body.taskID;
  const subTaskTitle = req.body.subTaskTitle;
  const subTaskDescription = req.body.subTaskDescription;

  const newSubTask = {
    title: subTaskTitle,
    description: subTaskDescription,
    completed: {
      status: 'pending'
    }
  };
  //TODO: use this, or findOneAndUpdate here ?
  List.findById(listID)
    .then(list => {
      let task = list.tasks.id(taskID);
      task.subTasks.push(newSubTask);
      list.incomplete_count.subTasks += 1;
      list
        .save()
        .then(doc => res.send(doc + ' task was added'))
        .catch(err => res.status(400).send(err + "  couldn't save task"));
    })
    .catch(err => res.status(400).send(err + "couldn't find that list"));
});

app.get('/subtasks', (req, res) => {
  const listID = req.query.listID;
  const taskID = req.query.taskID;

  List.findOne({ _id: listID })
    .then(list => {
      let subtasks = list.tasks.id(taskID).subTasks;
      res.send(subtasks);
    })
    .catch(err => res.status(400).send(err + "couldn't find that list"));
});

app.get('/subtasks/:id', (req, res) => {
  let listID = req.query.listID;
  let taskID = req.query.taskID;
  let subtaskID = req.params.id;

  List.findById(listID)
    .then(list => {
      let doc = list.tasks.id(taskID).subTasks.id(subtaskID);
      res.send(doc);
    })
    .catch(err => res.status(400).send(err + "couldn't find that list"));
});

app.put('/subtasks/:id/toggle_completion', (req, res) => {
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
});

app.listen(app.get('PORT'), function() {
  console.log(
    'Express started on http://localhost:' + app.get('PORT') + '; press Ctrl-C to terminate.'
  );
});
