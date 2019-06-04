import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListNav from './containers/listNav';
import TaskTable from './containers/taskTable';
import SubTaskTable from './containers/subTaskTable';
import ListModal from './containers/editListModal';
import TaskModal from './containers/editTaskModal';
// import CompletedArea from './containers/completedArea';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row" style={{ height: '100%' }}>
            <div
              className="col-3 col-xs-offset-1 sidebar-outer sticky-top"
              style={{
                height: '100vh',
                backgroundColor: 'rgb(115, 134, 213)'
              }}
            >
              <ListNav />
            </div>
            <div
              className={this.props.showSubTaskPanel ? 'col-7' : 'col-9'}
              // style={{ marginLeft: '400px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <TaskTable />
              </div>
            </div>
            {this.props.showSubTaskPanel && (
              <div className="col-2">
                <SubTaskTable />
              </div>
            )}
            {this.props.showEditListModal === 'true' && <ListModal />}
            {this.props.showEditTaskModal === 'true' && <TaskModal />}
            {/* {this.props.showCompletedTasksArea === 'true' && <CompletedArea />} */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    showSubTaskPanel: state.SubTaskReducer.showSubTaskPanel,
    showEditListModal: state.ListReducer.showModal,
    showEditTaskModal: state.ListReducer.showEditTaskModal,
    showCompletedTasksArea: state.ListReducer.showCompletedTasksArea
  };
};

// const mapDispatchprops = dispatch => {
//   return { onFetchData: () => dispatch(fetchData()) };
// };

export default connect(mapStatetoProps)(App);

// export default App;
