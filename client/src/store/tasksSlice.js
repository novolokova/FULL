import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { decarateAsyncThunk, pendingReducer, rejectedReducer } from './helpers';


export const createTask = decarateAsyncThunk({
  type: 'tasks/createTask',
  thunk: httpClient.postTask,
});

export const getAllTasks = decarateAsyncThunk({
  type: 'tasks/getAllTasks',
  thunk: httpClient.getTasks,
});

export const getAllTasksMore = decarateAsyncThunk({
  type: 'users/getAllTasksMore',
  thunk: httpClient.getTasks,
});

export const getOneTask = decarateAsyncThunk({
  type: 'tasks/getOneTask',
  thunk: httpClient.getTask,
});

export const getUserListTasks = decarateAsyncThunk({
  type: 'tasks/getUserTasks',
  thunk: httpClient.getUserTasks,
});

export const updateTask = decarateAsyncThunk({
  type: 'users/updateTask',
  thunk: httpClient.patchTask,
});

export const deleteTask = decarateAsyncThunk({
  type: 'tasks/deleteTask',
  thunk: httpClient.deleteTask,
});

const tasksSlice = createSlice({
  name: 'tasks', 
  initialState: {
    tasks: [], 
    error: null,
    isFetching: false, 
    currentTask: null, 
    userListTask: null,
  },
 
  extraReducers: (builder) => {

    // ***************createTask***********************
    builder.addCase(createTask.pending, pendingReducer);
    builder.addCase(createTask.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.tasks.push(data);
    });
    builder.addCase(createTask.rejected, rejectedReducer);

    // ***************getAllTasks***********************
    builder.addCase(getAllTasks.pending, pendingReducer);
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.tasks = data;
    });
    builder.addCase(getAllTasks.rejected, rejectedReducer);


 //****** getAllTasksMore ************ */
 builder.addCase(getAllTasksMore.pending, pendingReducer);
 builder.addCase(getAllTasksMore.fulfilled, (state, action) => {
   const {
     payload: {
       data: { data },
     },
   } = action;
   state.error = null;
   state.isFetching = false;
   state.tasks.push(...data);
 });
 builder.addCase(getAllTasksMore.rejected, rejectedReducer);


    // ***************getOneTask***********************
    builder.addCase(getOneTask.pending, pendingReducer);
    builder.addCase(getOneTask.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.currentTask = data;
    });
    builder.addCase(getOneTask.rejected, rejectedReducer);

    //****** updateTask ************ */
    builder.addCase(updateTask.pending, pendingReducer);
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      const index = state.tasks.findIndex((task) => task._id === data._id);
      state.tasks[index] = data;
    });
    builder.addCase(updateTask.rejected, rejectedReducer);

//***************getUserTasks************ */
builder.addCase(getUserListTasks.pending, pendingReducer);
    builder.addCase(getUserListTasks.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.userListTask = data;
    });
    builder.addCase(getUserListTasks.rejected, rejectedReducer);


    //****** deleteTask ************ */
    builder.addCase(deleteTask.pending, pendingReducer);
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.tasks = state.tasks.filter((task) => task._id !== data._id);
    });
    builder.addCase(deleteTask.rejected, rejectedReducer);

   
  },
});

export default tasksSlice.reducer;
