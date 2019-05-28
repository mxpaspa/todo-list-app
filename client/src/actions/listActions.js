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
        console.log(res.data);
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
  console.log(`from edit list action ${show}`);
  return dispatch => {
    dispatch({ type: 'ShowEditListModal', showModal: show || 'true' });
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
