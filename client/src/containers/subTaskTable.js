import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSubTask } from '../actions/subTaskActions';

class SubTaskTable extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddSubTask(
      this.state.subTaskTitle,
      this.props.currentListId,
      this.props.currentTaskId
    );
    e.target.reset();
  };

  handleBodyChange(e) {
    this.setState({
      subTaskTitle: e.target.value
    });
    console.log(this.state.subTaskTitle);
  }

  render() {
    return (
      <div>
        <div className="sidebar-header">
          <h3>Subtasks</h3>
        </div>

        <form name="list_nav" className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="input-group align-items-center">
            <div className="col-sm-7" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <input
                onChange={e => this.handleBodyChange(e)}
                type="text"
                className="form-control "
                id="todo-input"
                style={{ borderRadius: '5px' }}
              />
            </div>

            <div
              className="col-sm-2 d-flex justify-content-center"
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            >
              <span className="input-group-btn">
                <button className="btn  btn-sm btn-circle" style={{ borderRadius: '30px' }}>
                  <i className="fa fa-plus" />
                </button>
              </span>
            </div>
          </div>
        </form>
        <ul className="list-group" style={{ backgroundColor: 'black' }}>
          {this.props.subTasks.map(subTask => {
            return (
              <li
                className={'list-group-item d-flex align-items-center '}
                key={subTask._id}
                onClick={() => {
                  console.log(this.props.currentListId);
                }}
              >
                {subTask.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    tasks: state.ListReducer.tasks,
    subTasks: state.SubTaskReducer.subTasks,
    //   error: state.error,
    //   data: state.data,
    currentListId: state.ListReducer.currentListId,
    currentTaskId: state.ListReducer.currentTaskId,
    showSubTaskPanel: state.SubTaskReducer.showSubTaskPanel
  };
};

const mapDispatchprops = dispatch => {
  return {
    onAddSubTask: (subTaskTitle, listID, taskID) =>
      dispatch(addSubTask(subTaskTitle, listID, taskID))
    // onSetCurrentTaskId: (id, listID) => dispatch(setCurrentTaskId(id, listID)),
    // onToggleTask: (taskID, listID) => dispatch(toggleTask(taskID, listID)),
    // onDeleteTask: (taskID, listID) => dispatch(deleteTask(taskID, listID)),
    // onShowSubTaskPanel: () => dispatch(showSubTaskPanel())
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(SubTaskTable);
