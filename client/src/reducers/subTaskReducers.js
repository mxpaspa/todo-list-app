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
    case 'DeleteSubTask':
      return { ...state, subTasks: action.data };
    // case 'SetCurrentTaskID':
    //   return { ...state, currentTaskId: action.currentTaskId };
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

export default SubTaskReducer;
