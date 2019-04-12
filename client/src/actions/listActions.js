import axios from 'axios';

export const fetchData = () => {
  return dispatch => {
    axios
      .get('http://localhost:5000/lists')
      .then(res => {
        dispatch({ type: 'FetchData', data: res.data.lists });
      })
      .catch(res => {
        return Promise.reject(res);
      });
  };
};

// export const fetchTasks = id => {
//   return dispatch => {
//     axios
//       .get('http://localhost:5000/tasks', {
//         params: {
//           listID: id
//         }
//       })
//       .then(res => dispatch({ type: 'FetchTasks', tasks: res.data }))
//       .catch(res => {
//         return Promise.reject(res);
//       });
//   };
// };

export const addList = title => {
  return dispatch => {
    axios
      .post('http://localhost:5000/lists', { listTitle: title })
      .then(res => {
        console.log(res.data);

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
      .delete(`http://localhost:5000/lists/${id}`)
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
    console.log(id);
    dispatch({ type: 'SetCurrentListId', currentListId: id });
  };
};
