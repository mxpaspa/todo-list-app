import { combineReducers } from 'redux';
import ListReducer from './listReducers';
import TaskReducer from './taskReducers';
import SubTaskReducer from './subTaskReducers';

export default combineReducers({
  ListReducer: ListReducer,
  TaskReducer: TaskReducer,
  SubTaskReducer: SubTaskReducer
});
