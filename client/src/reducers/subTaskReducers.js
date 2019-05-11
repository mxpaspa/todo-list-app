const intialState = {
  //   data: [],
  showSubTaskPanel: false,
  subTasks: []
};

const SubTaskReducer = (state = intialState, action) => {
  switch (action.type) {
    // case 'FetchTasks':
    //   return { ...state, tasks: action.tasks };
    // case 'AddTodo':
    //   let newTask = state.tasks.concat(action.task);
    //   return { ...state, tasks: newTask };
    // case 'DeleteTodo':
    //   return { ...state, list: action.list };
    // case 'SetCurrentTaskID':
    //   return { ...state, currentTaskId: action.currentTaskId };
    case 'AddSubTask':
      let newSubTask = state.tasks.concat(action.subTask);
      return { ...state, subTasks: newSubTask };
    case 'ShowSubTaskPanel':
      return { ...state, showSubTaskPanel: action.showSubTaskPanel };
    case 'ERROR':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default SubTaskReducer;
