const List = require('../models');
const util = require('util');
const expressValidator = require('express-validator');

module.exports = {
  createList: function(req, res) {
    req.checkBody('listTitle', 'Please give your list a title').notEmpty();
    req.getValidationResult().then(result => {
      if (!result.isEmpty()) {
        res.send({
          result: 'failed',
          message: `validation errors: ${util.inspect(result.array())}`
        });
      }
    });

    const listTitle = req.body.listTitle;
    const newList = new List({
      title: listTitle,
      completed: { status: 'pending' },
      incomplete_count: { tasks: 0, subTasks: 0 },
      previousState: ''
    });
    newList
      .save()
      .then(list => {
        res.send(list + ' List saved to database');
      })
      .catch(err => {
        res.status(400).send(err + 'Unable to save to database');
      });
  },

  showLists: function(req, res) {
    List.find({})
      .lean()
      .then(tasks => res.send(tasks))
      .catch(err => res.status(422).send(err + 'Unable to find list'));
  },

  findListById: function(req, res) {
    let id = req.params.id;
    List.findById(id)
      .then(list => res.send(list))
      .catch(err => res.status(422).send(err + ' could not find that list'));
  },

  toggleList: function(req, res) {
    let id = req.params.id;
    List.findById(id).then(list => {
      if (list.completed.status == 'completed') {
        const restoredState = JSON.parse(list.previousState);
        list.title = restoredState.title;
        list.completed = restoredState.completed;
        list.tasks = restoredState.tasks;
        list.incomplete_count = restoredState.incomplete_count;

        // list = restoredState;
      } else if (list.completed.status == 'pending') {
        list.previousState = '';
        const previousState = JSON.stringify(list);
        list.previousState = previousState;
        list.completed = { status: 'completed', completed_at: new Date() };
        list.incomplete_count.tasks = 0;
        list.incomplete_count.subTasks = 0;

        list.tasks.forEach(task => {
          if (task.completed.status == 'pending') {
            task.completed = { status: 'completed', completed_at: new Date() };
            task.subTasks.forEach(subTask => {
              if (subTask.completed.status == 'pending') {
                subTask.completed = {
                  status: 'completed',
                  completed_at: new Date()
                };
              }
            });
          }
        });
      } else {
        console.error('Something went wrong');
      }

      list
        .save()
        .then(list => {
          res.send(list);
        })
        .catch(err => res.status(204).send(err));
    });
  },

  deleteList: function(req, res) {
    let id = req.params.id;
    // List.findById(id)
    //   .then(doc => doc.remove())
    //   .catch(err => res.statu(400).send(err));
    // List.find({ _id:id }).remove().exec()
    List.findByIdAndRemove(id, function(err, offer) {
      if (err) {
        throw err;
      }
      res.send(offer);
    });
  }
};
