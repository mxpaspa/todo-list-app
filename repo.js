// List.findOneAndUpdate({ title: listTitle }, { tasks: newTask })
//   .then(doc => res.send(doc + 'task added'))
//   .catch(err => res.status(400).send(err + 'unable to save to database'));
// newTask
//   .save()
//   .then(item => {
//     res.send(item + 'item saved to database');
//   })
//   .catch(err => {
//     res.status(400).send(err + 'unable to save to database');
//   });

// List.task.findOne({ _id: req.params.id }, (err, task) => {
//   !err && task.completed.status == 'pending'
//     ? (task.completed = { status: 'completed', completed_at: new Date() })
//     : (task.completed = { status: 'pending' });

//   task
//     .save()
//     .then(item => {
//       res.send(item + 'item saved to database');
//     })
//     .catch(err => {
//       res.status(400).send(err + 'unable to save to database');
//     });
// });

// taskSchema.pre('validate', function(next) {
//   if (!this.title) {
//     next(new Error('please provide a title for your task'));
//   } else {
//     next();
//   }
// });
// taskSchema.pre('save', next => {
//   now = new Date();
//   this.updated_at = now;
//   if (!this.completed.created_at) {
//     this.completed.created_at = now;
//   }
//   next();
// });

// .then(post => {
//     return post.patches
//       .find({ ref: post.id })
//       .then(patches => post.rollback(patches[2].id))
//       .then(console.log);
//   })

// list.tasks.forEach(task => {
//   list.completed.status == 'pending'
//     ? (task.completed = { status: 'completed', completed_at: new Date() })
//     : (task.completed = { status: 'pending' });
// });

// list.completed.status == 'pending'
//   ? (list.completed = { status: 'completed', completed_at: new Date() })
//   : (list.completed = { status: 'pending' });

/**
 * express patches !!
 */
// list.patches.find({ ref: list.id }).then(patches => (list = list.rollback(patches[0].id)));
