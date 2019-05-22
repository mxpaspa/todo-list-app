import axios from 'axios';

export const showSubTaskPanel = () => {
  return dispatch => {
    dispatch({ type: 'ShowSubTaskPanel', showSubTaskPanel: 'true' });
  };
};

export const fetchSubTasks = (listID, taskID) => {
  return dispatch => {
    axios
      .get('http://localhost:5000/subtasks', {
        params: {
          listID: listID,
          taskID: taskID
        }
      })
      .then(res => dispatch({ type: 'FetchSubTasks', subTasks: res.data }))
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const addSubTask = (subTaskTitle, listID, taskID) => {
  return dispatch => {
    axios
      .post('http://localhost:5000/subtasks', {
        subTaskTitle: subTaskTitle,
        listID: listID,
        taskID: taskID
      })
      .then(res => {
        console.log('from todo action: ', res.data);
        dispatch({ type: 'AddSubTask', subTask: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const deleteSubTask = (subTaskID, listID, taskID) => {
  console.log(`subTaskID ${subTaskID}`);
  console.log(`taskID ${taskID}`);
  console.log(`listID ${listID}`);
  return dispatch => {
    axios
      .delete(`http://localhost:5000/subtasks/${subTaskID}`, {
        data: { listID: listID, taskID: taskID }
      })
      .then(res => {
        dispatch({ type: 'DeleteSubTask', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const toggleSubTask = (subTaskID, listID, taskID) => {
  return dispatch => {
    axios
      .put(`http://localhost:5000/subtasks/${subTaskID}/toggle_completion`, {
        listID: listID,
        taskID: taskID
      })
      .then(res => {
        dispatch({ type: 'ToggleSubTask', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};
