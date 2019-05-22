import axios from 'axios';

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

export const deleteTask = (taskID, listID) => {
  console.log(`task id ${taskID}`);
  return dispatch => {
    axios
      .delete(`http://localhost:5000/tasks/${taskID}`, { data: { listID: listID } })
      .then(res => {
        dispatch({ type: 'DeleteTask', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const toggleTask = (taskId, listID) => {
  return dispatch => {
    axios
      .put(`http://localhost:5000/tasks/${taskId}/toggle_completion`, {
        listID: listID
      })
      .then(res => {
        console.log(listID);
        console.log(res.data);
        dispatch({ type: 'ToggleTask', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const setCurrentTaskId = id => {
  return dispatch => {
    dispatch({ type: 'SetCurrentTaskID', currentTaskId: id });
  };
};
