import axios from 'axios';
import config from '../config/dev-config';

export const fetchTasks = id => {
  return dispatch => {
    axios
      .get(`http://${config.apiUrl}/tasks`, {
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
      .post(`http://${config.apiUrl}/tasks`, { listID: id, taskTitle: taskTitle })
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
      .delete(`http://${config.apiUrl}/tasks/${taskID}`, { data: { listID: listID } })
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
      .put(`http://${config.apiUrl}/tasks/${taskId}/toggle_completion`, {
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

export const showEditTaskModal = (id, show) => {
  console.log(`from showEditTaskModal ${show}`);
  return dispatch => {
    dispatch({ type: 'ShowEditTaskModal', showEditTaskModal: show || 'true' });
  };
};

export const showCompletedTasksArea = show => {
  console.log(`from showCompletedTasksArea ${show}`);
  return dispatch => {
    dispatch({ type: 'ShowCompletedTasksArea', showCompletedTasksArea: show });
  };
};

export const editTaskTitle = (id, listID, title) => {
  return dispatch => {
    axios
      .put(`http://${config.apiUrl}/tasks/${id}/edit_title`, { newTitle: title, listID: listID })
      .then(res => {
        dispatch({ type: 'EditTaskTitle', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};
