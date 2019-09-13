import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { editListTitle } from '../actions/listActions';
import { editTaskTitle, showEditTaskModal } from '../actions/taskActions';
import { connect } from 'react-redux';

class TaskModal extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();

    this.props.onEditTaskTitle(
      this.props.currentTaskId,
      this.props.currentListId,
      this.state.newTitle
    );

    e.target.reset();
  };

  handleBodyChange(e) {
    this.setState({
      newTitle: e.target.value
    });
  }

  render() {
    return ReactDOM.createPortal(
      <div
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: '2',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}
      >
        <div className="sidebar-header">
          <h3>Edit List Modal</h3>
        </div>

        <form
          className="form-horizontal"
          onSubmit={this.handleSubmit}
          style={{
            margin: 'auto',
            padding: 20,
            background: '#fff',
            borderRadius: '2px',
            maxWidth: '300px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
          }}
        >
          <div className="input-group align-items-center">
            <div className="col-sm-10" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
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
          <div className="modal-body"> Edit Task Modal </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              style={{ borderRadius: '30px' }}
              onClick={() => {
                this.props.onShowEditTaskModal(null, 'false');
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>,
      document.querySelector('#modal')
    );
  }
}

const mapStatetoProps = state => {
  return {
    currentListId: state.ListReducer.currentListId,
    currentTaskId: state.ListReducer.currentTaskId
  };
};

const mapDispatchprops = dispatch => {
  return {
    onShowEditTaskModal: (id, show) => dispatch(showEditTaskModal(id, show)),
    onEditTaskTitle: (id, listID, title) => dispatch(editTaskTitle(id, listID, title))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(TaskModal);
