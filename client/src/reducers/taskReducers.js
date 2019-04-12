const intialState = {
  //   data: [],
  tasks: [],
  task: {},
  currentTaskId: ''
};

const TaskReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'FetchTasks':
      return { ...state, tasks: action.tasks };
    case 'AddTodo':
      let newTask = state.tasks.concat(action.task);
      return { ...state, tasks: newTask };
    case 'DeleteTodo':
      return { ...state, list: action.list };
    case 'SetCurrentTaskID':
      return { ...state, currentTaskId: action.currentTaskId };
    case 'ERROR':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default TaskReducer;
