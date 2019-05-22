const intialState = {
  showSubTaskPanel: false,
  subTasks: []
};

const SubTaskReducer = (state = intialState, action) => {
  switch (action.type) {
    // case 'DeleteSubTask':
    //   return { ...state, subTasks: action.data };
    // case 'ToggleSubTask':
    //   return {
    //     ...state,
    //     subTasks: state.subTasks.map(subTask =>
    //       subTask._id === action.data._id
    //         ? { ...subTask, completed: action.data.completed }
    //         : subTask
    //     )
    //   };
    // case 'FetchSubTasks':
    //   return { ...state, subTasks: action.subTasks };
    // case 'AddSubTask':
    //   let newSubTask = state.subTasks.concat(action.subTask);
    //   return { ...state, subTasks: newSubTask };
    case 'ShowSubTaskPanel':
      return { ...state, showSubTaskPanel: action.showSubTaskPanel };
    case 'ERROR':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default SubTaskReducer;
