const intialState = {
  lists: [],
  list: {},
  tasks: [],
  currentListId: '',
  bgColor: 'black'
};

const ListReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'FetchData':
      return { ...state, lists: action.data };
    case 'FetchTasks':
      return { ...state, tasks: action.tasks };
    case 'AddList':
      let newItem = state.lists.concat(action.data);
      return { ...state, lists: newItem };
    case 'DeleteList':
      return { ...state, lists: state.lists.filter(list => action.data._id !== list._id) };
    case 'SetCurrentListId':
      return { ...state, currentListId: action.currentListId, bgColor: state.bgColor };
    case 'ERROR':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default ListReducer;
