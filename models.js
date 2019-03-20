const mongoose = require('mongoose');
// import patchHistory from 'mongoose-patch-history';
const patchHistory = require('mongoose-patch-history');

const subTaskSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
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
  subTasks: [subTaskSchema]
});

const listSchema = mongoose.Schema({
  title: { type: String, unique: true },
  completed: {
    status: { type: String, default: 'pending' },
    completed_at: { type: Date, required: false }
  },
  incomplete_count: { tasks: { type: Number }, subTasks: { type: Number } },
  tasks: [taskSchema],
  previousState: String
});

// subTaskSchema.pre('save', function(next) {
//   let taskCounter = listSchema.incomplete_count.tasks;
//   let subTaskCounter = this.incomplete_count.subTasks;

//   if (this.isNew('tasks')) {
//     // this.tasks.forEach(task => {
//     //   // count the tasks
//     //   if (task.completed.status == 'pending') {
//     //     taskCounter += 1;
//     //   }

//     //   if (task.completed.status == 'completed') {
//     //     taskCounter -= 1;
//     //   }
//     // });
//     console.log(tasks);
//   }

//   //   this.incomplete_count.tasks = taskCounter;
//   //   this.incomplete_count.subTasks = subTaskCounter;
//   next();
// });

listSchema.plugin(patchHistory.default, { mongoose, name: 'listPatches' });
let List = mongoose.model('List', listSchema);
module.exports = List;
