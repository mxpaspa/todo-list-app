import axios from 'axios';
import config from '../config/dev-config';
// let url = devConfig.apiUrl

export const fetchData = () => {
  return dispatch => {
    axios
      .get(`http://${config.apiUrl}/lists`)
      .then(res => {
        dispatch({ type: 'FetchData', data: res.data.lists });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const fetchIncompletedTaskCount = id => {
  return dispatch => {
    axios
      .get(`http://${config.apiUrl}/lists/${id}`)
      .then(res => {
        console.log(`fetch incomplete tasks action ${res.data.task_incomplete}`);
        dispatch({
          type: 'FetchIncompleteCount',
          data: res.data
        });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

// export const fetchIncompleteTaskCount = listID => {
//   console.log('incomplete tasks');
//   return dispatch => {
//     axios
//       .get(`http://${config.apiUrl}/incompleteTaskCount/?listID=${listID}`)
//       .then(res => {
//         console.log(`fetch incomplete task count ${res.data}`);
//         dispatch({
//           type: 'FetchIncompleteCount',
//           incompleteCount: res.data.incomplete_count.tasks
//         });
//       })
//       .catch(res => {
//         return Promise.reject(res);
//       });
//   };
// };

export const toggleList = id => {
  return dispatch => {
    axios
      .put(`http://${config.apiUrl}/lists/${id}/toggle_completion`)
      .then(res => {
        dispatch({ type: 'ToggleList', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const addList = title => {
  return dispatch => {
    axios
      .post(`http://${config.apiUrl}/lists`, { listTitle: title })
      .then(res => {
        dispatch({ type: 'AddList', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const deleteList = id => {
  return dispatch => {
    axios
      .delete(`http://${config.apiUrl}/lists/${id}`)
      .then(res => {
        dispatch({ type: 'DeleteList', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

export const setCurrentListId = id => {
  return dispatch => {
    dispatch({ type: 'SetCurrentListId', currentListId: id });
  };
};

export const showEditListModal = (id, show) => {
  return dispatch => {
    dispatch({ type: 'ShowEditListModal', showEditListModal: show || 'true' });
  };
};

export const editListTitle = (id, title) => {
  return dispatch => {
    axios
      .put(`http://${config.apiUrl}/lists/${id}/edit_title`, { newTitle: title })
      .then(res => {
        dispatch({ type: 'EditListTitle', data: res.data });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};
