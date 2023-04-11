import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { decarateAsyncThunk, pendingReducer, rejectedReducer } from './helpers';

// зробити усі запити та прописати extraReducers

//******************** */

// export const createTask = decarateAsyncThunk({
//   type: "tasks/createTask",
//   thunk: httpClient.post***,
// });

export const getAllTasks = decarateAsyncThunk({
  type: 'tasks/getAllTasks',
  thunk: httpClient.getTasks,
});

export const getOneTask = decarateAsyncThunk({
  type: 'tasks/getOneTask',
  thunk: httpClient.getTask,
});


export const deleteTask = decarateAsyncThunk({
    type: 'tasks/deleteTask',
    thunk: httpClient.deleteTask,
  });

const tasksSlice = createSlice({
  name: 'tasks', // назва в rootReducer
  initialState: {
    tasks: [], // fulfilled(data)
    error: null, // reject(error)
    isFetching: false, //pending(loding)
    currentTask: null, //getOneUser
  },
  reducers: {},

  extraReducers: (builder) => {
    // ***************createTask***********************

    //     builder.addCase(createGroup.pending, pendingReducer);
    //     builder.addCase(createGroup.fulfilled, (state, action) => {
    //       const {payload:{data:{data}}} =action;
    //       state.error = null;
    //       state.isFetching = false;
    //       state.groups.push(data);
    //     });
    //     builder.addCase(createGroup.rejected, rejectedReducer);

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
    //1 variant
    //  state.tasks.splice(data.id, 1);

    //2 variant
    state.tasks = state.tasks.filter((task) => task._id !== data._id);
  });
  builder.addCase(deleteTask.rejected, rejectedReducer);


    //end*************************
  },
});

export default tasksSlice.reducer;
