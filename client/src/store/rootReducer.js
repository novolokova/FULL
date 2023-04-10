import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';
import usersReducer from './usersSlice';
import tasksReducer from './tasksSlice';
import groupsReducer from './groupsSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todoReducer,
  users: usersReducer,
  tasks: tasksReducer,
  groups: groupsReducer,
});

export default rootReducer;
