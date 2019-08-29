const mongoose = require('mongoose');

const subTaskSchema = mongoose.Schema({
  title: { type: String },
  // description: { type: String },
  completed: {
    status: {
      type: String,
      default: 'pending'
    },
    completed_at: { type: Date, required: false }
  }
});

const taskSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  completed: {
    status: {
      type: String,
      default: 'pending'
    },
    completed_at: { type: Date, required: false }
  },
  subTasks: [subTaskSchema],
  previousTaskState: String
});

const listSchema = mongoose.Schema({
  title: { type: String },
  completed: {
    status: { type: String, default: 'pending' },
    completed_at: { type: Date, required: false }
  },
  // incomplete_count: { tasks: { type: Number }, subTasks: { type: Number } },
  task_incomplete: { type: Number },
  task_complete: { type: Number },
  tasks: [taskSchema],
  previousState: String
});

// listSchema.post('init', (doc, next) => {
//   doc.task_incomplete = doc.tasks.length;
//   // doc.incomplete_count.subTasks = doc.tasks.forEach(task => {
//   //   task.subTasks.length
//   // });
//   doc.save();
//   // next();
// });

// listSchema.post('save', (doc, next) => {
//   // doc.incomplete_count.tasks = doc.tasks.length;
//   // doc.save();
//   console.log(doc);
//   next();
// });

listSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.previousState;
  return obj;
};

//TODO: this is only converting to an object, not deleting the property
taskSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.previousTaskState;
  return obj;
};

let List = mongoose.model('List', listSchema);
module.exports = List;
