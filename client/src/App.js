import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListNav from './containers/listNav';
import TaskTable from './containers/taskTable';
import SubTaskTable from './containers/subTaskTable';
import Modal from './containers/editModal';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row" style={{ height: '100% vh' }}>
            <div
              className="col-3"
              style={{
                height: '100vh',
                backgroundColor: 'rgb(115, 134, 213)'
              }}
            >
              <ListNav />
            </div>
            <div className={this.props.showSubTaskPanel ? 'col-7' : 'col-9'}>
              <div style={{ textAlign: 'center' }}>
                <TaskTable />
              </div>
            </div>

            {this.props.showSubTaskPanel && (
              <div className="col-2">
                <SubTaskTable />
              </div>
            )}
            {this.props.showEditListModal === 'true' && <Modal />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    showSubTaskPanel: state.SubTaskReducer.showSubTaskPanel,
    showEditListModal: state.ListReducer.showModal
  };
};

// const mapDispatchprops = dispatch => {
//   return { onFetchData: () => dispatch(fetchData()) };
// };

export default connect(mapStatetoProps)(App);

// export default App;
