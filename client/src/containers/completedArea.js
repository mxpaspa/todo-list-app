import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  toggleTask,
  setCurrentTaskId,
  deleteTask,
  addTodo,
  showEditTaskModal
} from '../actions/taskActions';
import { showSubTaskPanel, fetchSubTasks } from '../actions/subTaskActions';
import { fetchIncompletedTaskCount, fetchCompletedTaskCount } from '../actions/listActions';

class TaskTable extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddTodo(this.props.currentListId, this.state.taskTitle);
    e.target.reset();
  };

  handleBodyChange(e) {
    this.setState({
      taskTitle: e.target.value
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.tasks.map(todo => {
          if (todo.completed.status === 'completed') {
            return (
              <li
                className={'list-group-item d-flex align-items-center disabled '}
                key={todo._id}
                style={{
                  marginBottom: '20px',
                  borderRadius: '5px',
                  textDecoration: 'line-through'
                }}
                onClick={() => {
                  this.props.onShowSubTaskPanel();
                  this.props.onSetCurrentTaskId(todo._id);
                  this.props.onFetchSubTasks(this.props.currentListId, todo._id);
                }}
              >
                <div className="col-sm-1">
                  <input
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    key={todo._id}
                    onClick={() => {
                      this.props.onSetCurrentTaskId(todo._id);
                      this.props.onToggleTask(todo._id, this.props.currentListId);
                      setTimeout(() => {
                        this.props.onFetchIncompletedTaskCount(this.props.currentListId);
                      }, 250);
                      setTimeout(() => {
                        this.props.onFetchCompletedTaskCount(this.props.currentListId);
                      }, 250);
                    }}
                  />
                </div>
                <div
                  className="col-sm-9"
                  onClick={() => {
                    this.props.onSetCurrentTaskId(todo._id);
                  }}
                >
                  <div style={{ float: 'left', textDecoration: 'line-through' }}>{todo.title}</div>
                </div>
                <div
                  className="col-sm-1 d-flex justify-content-center"
                  style={{ paddingLeft: '0px', paddingRight: '0px' }}
                >
                  <button
                    key={todo._id}
                    className="btn btn-sm"
                    style={{ backgroundColor: 'transparent' }}
                    onClick={() => {
                      this.props.onSetCurrentTaskId(todo._id);
                      this.props.onShowEditTaskModal(null, 'true');
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true" />
                  </button>
                </div>
                <div className="col-sm-1">
                  <button
                    key={todo._id}
                    className="btn btn-sm"
                    style={{ backgroundColor: 'transparent' }}
                    onClick={() => {
                      this.props.onDeleteTask(todo._id, this.props.currentListId);
                    }}
                  >
                    <i className="fa fa-minus-circle" aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

const mapStatetoProps = state => {
  return {
    tasks: state.ListReducer.tasks,
    error: state.error,
    data: state.data,
    currentListId: state.ListReducer.currentListId,
    currentTaskId: state.ListReducer.currentTaskId,
    showSubTaskPanel: state.SubTaskReducer.showSubTaskPanel
    // completedTaskCount: state.ListReducer.incompleteCount
  };
};

const mapDispatchprops = dispatch => {
  return {
    onAddTodo: (id, taskTitle) => dispatch(addTodo(id, taskTitle)),
    onSetCurrentTaskId: (id, listID) => dispatch(setCurrentTaskId(id, listID)),
    onToggleTask: (taskID, listID) => dispatch(toggleTask(taskID, listID)),
    onDeleteTask: (taskID, listID) => dispatch(deleteTask(taskID, listID)),
    onShowSubTaskPanel: () => dispatch(showSubTaskPanel()),
    onShowEditTaskModal: (id, show) => dispatch(showEditTaskModal(id, show)),
    onFetchSubTasks: (listID, taskID) => dispatch(fetchSubTasks(listID, taskID)),
    onFetchIncompletedTaskCount: listID => dispatch(fetchIncompletedTaskCount(listID)),
    onFetchCompletedTaskCount: listID => dispatch(fetchCompletedTaskCount(listID))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(TaskTable);
