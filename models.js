const mongoose = require('mongoose');

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

let List = mongoose.model('List', listSchema);
module.exports = List;
