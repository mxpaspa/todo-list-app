import axios from 'axios';

// export const fetchData = () => {
//   return dispatch => {
//     axios
//       .get('http://localhost:5000/lists')
//       .then(res => {
//         dispatch({ type: 'FetchData', data: res.data.lists });
//       })
//       .catch(res => {
//         return Promise.reject(res);
//       });
//   };
// };

export const fetchTasks = id => {
  return dispatch => {
    axios
      .get('http://localhost:5000/tasks', {
        params: {
          listID: id
        }
      })
      .then(res => dispatch({ type: 'FetchTasks', tasks: res.data }))
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const addTodo = (id, taskTitle) => {
  console.log('from action: ', id);
  return dispatch => {
    axios
      .post('http://localhost:5000/tasks', { listID: id, taskTitle: taskTitle })
      .then(res => {
        console.log('from todo action: ', res.data);
        dispatch({ type: 'AddTodo', task: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

// export const deleteTodo = id => {
//   return dispatch => {
//     axios
//       .delete(`http://localhost:5000/lists/${id}`)
//       .then(res => {
//         // console.log(`list tile ${title}`);
//         dispatch({ type: 'DeleteList', data: res.data });
//       })
//       .catch(res => {
//         return Promise.reject(res);
//       });
//   };
// };

export const toggleTask = (taskId, listID) => {
  return dispatch => {
    axios
      .put(`http://localhost:5000/lists/${taskId}/toggle_completion`, {
        listID: listID
      })
      .then(res => {
        console.log('toggleTask action');
        dispatch({ type: 'toggleTask', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const setCurrentTaskId = id => {
  return dispatch => {
    console.log(id);
    dispatch({ type: 'SetCurrentTaskId', currentTaskId: id });
  };
};
