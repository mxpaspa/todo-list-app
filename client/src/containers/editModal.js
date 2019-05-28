import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { showEditListModal, editListTitle } from '../actions/listActions';
import { connect } from 'react-redux';

class Modal extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.onEditListTitle(this.props.currentListId, this.state.newTitle);
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
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
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
            padding: 20,
            background: '#fff',
            borderRadius: '2px',
            display: 'inline-block',
            minHeight: '300px',
            margin: '1rem',
            position: 'relative',
            minWidth: '300px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            justifySelf: 'center'
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
        </form>
        <button
          className="btn btn-primary"
          style={{ borderRadius: '30px' }}
          onClick={() => {
            this.props.onShowEditListModal(null, 'false');
          }}
        >
          Close
        </button>
      </div>,
      document.querySelector('#modal')
    );
  }
}

const mapStatetoProps = state => {
  return {
    currentListId: state.ListReducer.currentListId
  };
};

const mapDispatchprops = dispatch => {
  return {
    onShowEditListModal: (id, show) => dispatch(showEditListModal(id, show)),
    onEditListTitle: (id, title) => dispatch(editListTitle(id, title))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(Modal);
