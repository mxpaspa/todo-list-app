import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/taskActions';
import { fetchTasks } from '../actions/taskActions';
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
      <div id="container" className="col-md-8 col-md-offset-2 ">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              className="form-control col-md-12"
              onChange={e => this.handleBodyChange(e)}
              type="text"
              className="form-control"
              id="addTask"
            />
            <span className="input-group-btn">
              <button type="submit" id="list_nav_submit" className="btn-default btn">
                Submit
              </button>
            </span>
          </div>

          <br />
        </form>
        <div>
          {this.props.tasks.map(todo => {
            return (
              <div className="list-group" key={todo._id} style={{ marginTop: '30px' }}>
                <a
                  href="#"
                  key={todo._id}
                  className="list-group-item"
                  onClick={() => console.log('task id: ', todo._id)}
                >
                  {todo.title}
                </a>
                <div className="col-sm-2">
                  <button
                    key={todo._id}
                    className="btn btn-secondary btn-sm"
                    // onClick={() => {
                    //   this.props.onDeleteList(list._id);
                    // }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    tasks: state.TaskReducer.tasks,
    newTask: state.TaskReducer.task,
    error: state.error,
    data: state.data,
    currentListId: state.ListReducer.currentListId
  };
};

const mapDispatchprops = dispatch => {
  return {
    onAddTodo: (id, taskTitle) => dispatch(addTodo(id, taskTitle)),
    onFetchTasks: id => dispatch(fetchTasks(id))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(TaskTable);
