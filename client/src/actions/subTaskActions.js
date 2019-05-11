import axios from 'axios';

export const showSubTaskPanel = () => {
  return dispatch => {
    dispatch({ type: 'ShowSubTaskPanel', showSubTaskPanel: 'true' });
  };
};

export const addSubTask = (subTaskTitle, listID, taskID) => {
  console.log('listID from subTaskAction: ', listID);
  console.log('listID from subTaskAction: ', taskID);
  console.log('listID from subTaskAction: ', subTaskTitle);
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
