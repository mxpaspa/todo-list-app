import { combineReducers } from 'redux';
import ListReducer from './listReducers';
import TaskReducer from './taskReducers';

export default combineReducers({
  ListReducer: ListReducer,
  TaskReducer: TaskReducer
});
