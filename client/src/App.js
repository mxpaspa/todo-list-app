import React, { Component } from 'react';
import ListNav from './containers/listNav';
import TaskTable from './containers/taskTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="wrapper" style={{ display: 'flex', width: '100%' }}> */}
        {/* <nav
            id="sidebar"
            style={{
              // display: 'inline-block',
              width: '250px',
              position: 'fixed',
              top: '0',
              left: '0',
              height: '100vh',
              // z-index: '999',
              background: '#7386D5',
              color: '#fff',
              transition: 'all 0.3s'
            }}
          >
            <ListNav />
          </nav> */}

        {/* <div
            id="content"
            className="container"
            // style={{
            //   // display: 'inline-block',
            //   // marginTop: '80px',
            //   padding: '40px',
            //   top: 0,
            //   right: 0,
            //   position: 'absolute',
            //   // float: 'right',
            //   minBlockSize: '100vh',
            //   width: 'calc(100%-250px)'
            // }}
          >
            <TaskTable />
          </div> */}
        {/* </div> */}
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-3"
              style={{
                height: '100vh',
                backgroundColor: 'rgb(115, 134, 213)'
              }}
            >
              <ListNav />
            </div>
            <div className="col-9">
              <div style={{ textAlign: 'center' }}>
                <TaskTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStatetoProps = state => {
//   return { data: state.data, error: state.error };
// };

// const mapDispatchprops = dispatch => {
//   return { onFetchData: () => dispatch(fetchData()) };
// };

// export default connect(
//   mapStatetoProps,
//   mapDispatchprops
// )(App);

export default App;
