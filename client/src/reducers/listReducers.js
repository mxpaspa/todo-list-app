const intialState = {
  lists: [],
  tasks: [],
  subTasks: [],
  currentListId: '',
  currentTaskId: '',
  bgColor: 'black'
};

const ListReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'FetchData':
      return { ...state, lists: action.data };
    case 'ToggleList':
      let test = action.data.tasks.map(task => task.subTasks);
      var flattened = [].concat.apply([], test);
      console.log(flattened);
      return {
        ...state,
        lists: state.lists.map(list =>
          list._id === action.data._id ? { ...list, completed: action.data.completed } : list
        ),
        tasks: action.data.tasks,
        subTasks: flattened
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
      return { ...state, tasks: action.data.tasks };
    case 'SetCurrentTaskID':
      // console.log(`taskID: ${currentTaskId}`);
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
    case 'DeleteSubTask':
      return { ...state, subTasks: action.data };
    case 'ToggleSubTask':
      return {
        ...state,
        subTasks: state.subTasks.map(subTask =>
          subTask._id === action.data._id
            ? { ...subTask, completed: action.data.completed }
            : subTask
        )
      };
    case 'FetchSubTasks':
      return { ...state, subTasks: action.subTasks };
    case 'AddSubTask':
      let newSubTask = state.subTasks.concat(action.subTask);
      return { ...state, subTasks: newSubTask };
    case 'ShowSubTaskPanel':
      return { ...state, showSubTaskPanel: action.showSubTaskPanel };
    case 'ERROR':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default ListReducer;
