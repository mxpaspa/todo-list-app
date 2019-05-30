import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSubTask, deleteSubTask, toggleSubTask } from '../actions/subTaskActions';

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
          <h3 style={{ wordWrap: 'break-word' }}>SubTask Title Here</h3>
        </div>

        <form name="list_nav" className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="input-group align-items-center">
            <div className="col-md-10" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
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
                <button className="btn btn-sm btn-circle primary">
                  <i className="fa fa-plus" />
                </button>
              </span>
            </div>
          </div>
        </form>
        <ul className="list-group">
          {this.props.subTasks.map(subTask => {
            return (
              <li
                className={'list-group-item d-flex align-items-center '}
                key={subTask._id}
                style={{
                  backgroundColor: 'transparent',
                  // border: 'none',
                  display: 'block',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  marginBottom: '2px',
                  marginTop: '5px',
                  borderRadius: '5px'
                }}
              >
                <div
                  key={subTask._id}
                  value={subTask._id}
                  className="col-sm-10 d-flex align-items-center "
                  style={{
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    width: '100%',
                    // backgroundColor:
                    //   subTask._id === this.props.currentListId ? 'rgb(203, 210, 239)' : '#7386D5',
                    borderRadius: '5px',
                    // subTask._id === this.props.currentListId ? '' : '#7386D5',
                    textDecoration:
                      subTask.completed.status === 'completed' ? 'line-through' : 'none'
                  }}
                >
                  <input
                    style={{ marginRight: '10px', marginLeft: '5px' }}
                    type="checkbox"
                    onChange={() => {
                      this.props.onToggleSubTask(
                        subTask._id,
                        this.props.currentListId,
                        this.props.currentTaskId
                      );
                    }}
                    aria-label="Checkbox for toggling subTask completion"
                  />
                  {subTask.title}
                </div>
                <div
                  className="col-sm-2 d-flex justify-content-center"
                  style={{ paddingLeft: '0px', paddingRight: '0px' }}
                >
                  <button
                    key={subTask._id}
                    className="btn btn-sm"
                    style={{ backgroundColor: 'transparent' }}
                    onClick={() => {
                      this.props.onDeleteSubTask(
                        subTask._id,
                        this.props.currentListId,
                        this.props.currentTaskId
                      );
                    }}
                  >
                    <i className="fa fa-minus-circle" />
                  </button>
                </div>
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
    subTasks: state.ListReducer.subTasks,
    currentListId: state.ListReducer.currentListId,
    currentTaskId: state.ListReducer.currentTaskId,
    showSubTaskPanel: state.SubTaskReducer.showSubTaskPanel
  };
};

const mapDispatchprops = dispatch => {
  return {
    onAddSubTask: (subTaskTitle, listID, taskID) =>
      dispatch(addSubTask(subTaskTitle, listID, taskID)),
    // onFetchSubTasks: (listID, taskID) => dispatch(fetchSubTasks(listID, taskID))
    // onSetCurrentTaskId: (id, listID) => dispatch(setCurrentTaskId(id, listID)),
    onToggleSubTask: (subTaskID, listID, taskID) =>
      dispatch(toggleSubTask(subTaskID, listID, taskID)),
    onDeleteSubTask: (subTaskID, taskID, listID) =>
      dispatch(deleteSubTask(subTaskID, taskID, listID))
    // onShowSubTaskPanel: () => dispatch(showSubTaskPanel())
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(SubTaskTable);
