import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchData,
  deleteList,
  addList,
  setCurrentListId,
  toggleList
} from '../actions/listActions';
import { fetchTasks } from '../actions/taskActions';

class ListNav extends Component {
  state = {};

  componentWillMount() {
    this.props.onFetchData();
    console.log('component did mount');
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddList(this.state.listTitle);
  };

  handleBodyChange(e) {
    this.setState({
      listTitle: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="sidebar-header">
          <h3>Todo List App</h3>
        </div>

        <form name="list_nav" className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="input-group align-items-center">
            <div className="col-sm-10" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <input
                onChange={e => this.handleBodyChange(e)}
                type="text"
                className="form-control "
                id="inputEmail3"
                style={{ borderRadius: '5px' }}
              />
            </div>

            <div
              className="col-sm-2 d-flex justify-content-center"
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            >
              <span className="input-group-btn">
                <button
                  className="btn  btn-sm btn-primary btn-circle"
                  style={{ borderRadius: '30px' }}
                >
                  <i className="fa fa-plus" />
                </button>
              </span>
            </div>
          </div>
        </form>

        <ul className="list-group" style={{ listStyleType: 'none', marginTop: '10px' }}>
          {this.props.listArr.map(list => {
            return (
              <li
                className="list-group-item d-flex align-items-center"
                key={list._id}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  display: 'block',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  marginBottom: '2px'
                }}
              >
                <div
                  key={list._id}
                  value={list._id}
                  className="col-sm-10"
                  style={{
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    width: '100%',
                    backgroundColor:
                      list._id === this.props.currentListId ? 'rgb(203, 210, 239)' : '#7386D5',
                    borderRadius: '5px',
                    // list._id === this.props.currentListId ? '' : '#7386D5',
                    textDecoration: list.completed.status === 'completed' ? 'line-through' : 'none'
                  }}
                  onClick={() => {
                    this.props.onFetchTasks(list._id);
                    this.props.onSetCurrentListId(list._id);
                  }}
                >
                  <input
                    style={{ marginRight: '10px', marginLeft: '5px' }}
                    type="checkbox"
                    onChange={() => {
                      this.props.onToggleList(list._id);
                    }}
                    aria-label="Checkbox for toggling list completion"
                  />
                  {list.title}
                </div>
                <div
                  className="col-sm-2 d-flex justify-content-center"
                  style={{ paddingLeft: '0px', paddingRight: '0px' }}
                >
                  <button
                    key={list._id}
                    className="btn btn-secondary btn-sm"
                    // style={{ float: 'right' }}
                    onClick={() => {
                      this.props.onDeleteList(list._id);
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// maps state from store to props and passes the data to the component
const mapStatetoProps = state => {
  return {
    listArr: state.ListReducer.lists,
    newList: state.ListReducer.list,
    currentListId: state.ListReducer.currentListId,
    bgColor: state.ListReducer.bgColor,
    error: state.error
  };
};

const mapDispatchprops = dispatch => {
  return {
    onFetchData: () => dispatch(fetchData()),
    onFetchTasks: id => dispatch(fetchTasks(id)),
    onAddList: listTitle => dispatch(addList(listTitle)),
    onDeleteList: id => dispatch(deleteList(id)),
    onSetCurrentListId: id => dispatch(setCurrentListId(id)),
    onToggleList: id => dispatch(toggleList(id))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(ListNav);
