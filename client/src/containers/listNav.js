import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, deleteList, addList, setCurrentListId } from '../actions/listActions';
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
          <h3>Bootstrap Sidebar</h3>
        </div>
        <form name="list_nav" className="form-horizontal" onSubmit={this.handleSubmit}>
          {/* <div className="form-group row"> */}
          <div className="input-group">
            {/* <div className="form-group"> */}
            {/* <div className="col-sm-5"> */}
            <input
              onChange={e => this.handleBodyChange(e)}
              type="text"
              className="form-control col-md-12"
              id="inputEmail3"
            />
            {/* </div> */}
            {/* </div> */}
            {/* <div className="form-group"> */}
            <span className="input-group-btn">
              <div className="col-sm-2">
                <button type="submit" id="list_nav_submit" className="btn-default btn">
                  Submit
                </button>
              </div>
            </span>
            {/* </div> */}
          </div>

          {/* </div> */}
        </form>

        <ul className="list-unstyled components">
          {this.props.listArr.map(list => {
            return (
              <li key={list._id}>
                <div
                  className="row"
                  style={{
                    width: '250px'
                  }}
                >
                  <div
                    key={list._id}
                    value={list._id}
                    className="col-sm-9"
                    style={{
                      backgroundColor: list._id == this.props.currentListId ? 'black' : '#7386D5'
                    }}
                    onClick={() => {
                      this.props.onFetchTasks(list._id);
                      this.props.onSetCurrentListId(list._id);
                    }}
                  >
                    {list.title}
                  </div>
                  <div className="col-sm-2">
                    <button
                      key={list._id}
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.props.onDeleteList(list._id);
                      }}
                    />
                  </div>
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
    onSetCurrentListId: id => dispatch(setCurrentListId(id))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchprops
)(ListNav);
