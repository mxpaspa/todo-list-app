import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/taskActions';
import { setCurrentTaskId } from '../actions/taskActions';
import { toggleTask } from '../actions/taskActions';
import { deleteTask } from '../actions/taskActions';
// import { deleteTodo, toggleTodo, setVisibilityFilter } from '../actions/actionCreator';

class TaskTable extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddTodo(this.props.currentListId, this.state.taskTitle);
  };

  handleBodyChange(e) {
    this.setState({
      taskTitle: e.target.value
    });
  }

  render() {
    return (
      // <div id="container" className="col-md-8 col-md-offset-2 ">

      <div className="col-lg-10" style={{ display: 'inline-block', paddingTop: '40px' }}>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              className="form-control"
              onChange={e => this.handleBodyChange(e)}
              type="text"
              className="form-control"
              id="addTask"
            />
            <span className="input-group-btn">
              <button type="submit" id="list_nav_submit" className="btn btn-primary btn-lg">
                Submit
              </button>
            </span>
          </div>

          <br />
          <ul className="list-group">
            {this.props.tasks.map(todo => {
              return (
                <div className="form-group-row">
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={todo._id}
                    style={{
                      textDecoration:
                        todo.completed.status === 'completed' ? 'line-through' : 'none'
                    }}
                  >
                    <span>
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                        key={todo._id}
                        onClick={() => {
                          this.props.onSetCurrentTaskId(todo._id);
                          this.props.onToggleTask(todo._id, this.props.currentListId);
                        }}
                      />
                    </span>
                    {todo.title}
                    {/* {todo.completed.status} */}
                    {/* <span class="badge badge-primary badge-pill">
                        {todo.completed.completed_at}
                      </span> */}

                    <button
                      key={todo._id}
                      onClick={() => {
                        this.props.onDeleteTask(todo._id, this.props.currentListId);
                      }}
                      className="btn btn-secondary btn-sm"
                    />
                  </li>

                  {/* </div> */}
                </div>
              );
            })}
          </ul>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    tasks: state.ListReducer.tasks,
    error: state.error,
    data: state.data,
    currentListId: state.ListReducer.currentListId,
    currentTaskId: state.ListReducer.currentTaskId
  };
};

const mapDispatchprops = dispatch => {
  return {
    onAddTodo: (id, taskTitle) => dispatch(addTodo(id, taskTitle)),
    onSetCurrentTaskId: (id, listID) => dispatch(setCurrentTaskId(id, listID)),
    onToggleTask: (taskID, listID) => dispatch(toggleTask(taskID, listID)),
    onDeleteTask: (taskID, listID) => dispatch(deleteTask(taskID, listID))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(TaskTable);
