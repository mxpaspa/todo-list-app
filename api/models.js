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
  incomplete_count: { tasks: { type: Number }, subTasks: { type: Number } },
  tasks: [taskSchema],
  previousState: String
});

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
