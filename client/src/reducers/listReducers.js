const intialState = {
  lists: [],
  tasks: [],
  subTasks: [],
  currentListId: '',
  currentTaskId: '',
  showEditListModal: 'false',
  showEditTaskModal: 'false',
  showCompletedTasksArea: null,
  completedTaskCount: ''
};

const ListReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'FetchData':
      return { ...state, lists: action.data };
    case 'FetchIncompleteCount':
      console.log(`fetch incomplete count reducer ${action.data.task_incomplete}`);
      // return { ...state, incompleteCount: action.incompleteCount };
      return {
        ...state,
        lists: state.lists.map(list =>
          list._id === action.data._id
            ? { ...list, task_incomplete: action.data.task_incomplete }
            : list
        )
      };
    case 'FetchCompletedCount':
      console.log(`fetch completed count reducer ${action.data.task_complete}`);
      // return { ...state, incompleteCount: action.incompleteCount };
      return {
        ...state,
        // lists: state.lists.map(list =>
        //   list._id === action.data._id
        //     ? { ...list, task_incomplete: action.data.task_complete }
        //     : list
        // )
        completedTaskCount: action.data.task_complete
      };
    case 'ToggleList':
      let test = action.data.tasks.map(task => task.subTasks);
      var flattened = [].concat.apply([], test);
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
    case 'EditListTitle':
      return {
        ...state,
        lists: state.lists.map(list =>
          list._id === action.data._id ? { ...list, title: action.data.title } : list
        )
      };
    case 'DeleteList':
      return { ...state, lists: state.lists.filter(list => action.data._id !== list._id) };
    case 'SetCurrentListId':
      return { ...state, currentListId: action.currentListId };
    case 'ShowEditListModal':
      console.log(`from edit list reducer ${action.showEditListModal}`);
      return { ...state, showModal: action.showEditListModal };
    case 'FetchTasks':
      return { ...state, tasks: action.tasks };
    case 'AddTodo':
      let newTask = state.tasks.concat(action.task);
      return { ...state, tasks: newTask };
    case 'DeleteTask':
      return { ...state, tasks: action.data.tasks };
    case 'SetCurrentTaskID':
      return { ...state, currentTaskId: action.currentTaskId };
    case 'ToggleTask':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.data._id ? { ...task, completed: action.data.completed } : task
        )
      };
    case 'ShowEditTaskModal':
      console.log(`from edit task modal reducer ${action.showEditTaskModal}`);
      return { ...state, showEditTaskModal: action.showEditTaskModal };
    case 'ShowCompletedTasksArea':
      console.log(`from show completed tasks reducer ${action.showCompletedTasksArea}`);
      return { ...state, showCompletedTasksArea: action.showCompletedTasksArea };
    case 'EditTaskTitle':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.data._id ? { ...task, title: action.data.title } : task
        )
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
