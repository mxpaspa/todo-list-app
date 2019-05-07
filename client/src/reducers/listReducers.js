const intialState = {
  lists: [],
  tasks: [],
  currentListId: '',
  bgColor: 'black'
};

const ListReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'FetchData':
      return { ...state, lists: action.data };
    case 'ToggleList':
      console.log('toggle reducer');
      // let toggleList = state.lists.find(list => list._id === action.data._id);
      return {
        ...state,
        lists: state.lists.map(list =>
          list._id === action.data._id ? { ...list, completed: action.data.completed } : list
        ),
        tasks: action.data.tasks
      };
    case 'AddList':
      let newItem = state.lists.concat(action.data);
      return { ...state, lists: newItem };
    case 'DeleteList':
      return { ...state, lists: state.lists.filter(list => action.data._id !== list._id) };
    case 'SetCurrentListId':
      return { ...state, currentListId: action.currentListId, bgColor: state.bgColor };
    case 'FetchTasks':
      return { ...state, tasks: action.tasks };
    case 'AddTodo':
      let newTask = state.tasks.concat(action.task);
      return { ...state, tasks: newTask };
    case 'DeleteTask':
      console.log('delete task');
      return { ...state, tasks: action.data.tasks };
    case 'SetCurrentTaskID':
      return { ...state, currentTaskId: action.currentTaskId };
    case 'ToggleTask':
      console.log('toggle task reducer');
      // let toggleList = state.lists.find(list => list._id === action.data._id);
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.data._id ? { ...task, completed: action.data.completed } : task
        )
        // tasks: action.data.tasks
      };
    case 'ERROR':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default ListReducer;
