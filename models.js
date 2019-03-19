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
    completed_at: { type: Date, required: false },
    toggled_all: { type: Boolean, default: false }
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
    completed_at: { type: Date, required: false },
    toggled_all: { type: Boolean, default: false }
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
  tasks: [taskSchema]
});

listSchema.pre('save', function(next) {
  let counter = 0;
  this.tasks.forEach(task => {
    if (task.completed.status == 'pending') {
      counter += 1;
    }

    if (task.completed.status == 'completed') {
      counter -= 1;
    }
  });
  this.incomplete_count.tasks = counter;
  next();
});

listSchema.plugin(patchHistory.default, { mongoose, name: 'listPatches' });
let List = mongoose.model('List', listSchema);
module.exports = List;
