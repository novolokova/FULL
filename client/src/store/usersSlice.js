import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { decarateAsyncThunk, pendingReducer, rejectedReducer } from './helpers';

export const getAllUsers = decarateAsyncThunk({
  type: 'users/getAllUsers',
  thunk: httpClient.getUsers,
});
export const getAllUsersMore = decarateAsyncThunk({
  type: 'users/getAllUsersMore',
  thunk: httpClient.getUsers,
});
export const createUser = decarateAsyncThunk({
  type: 'users/createUser',
  thunk: httpClient.postUser,
});
export const getOneUser = decarateAsyncThunk({
  type: 'users/getOneUser',
  thunk: httpClient.getUser,
});
export const updateUser = decarateAsyncThunk({
  type: 'users/patchUser',
  thunk: httpClient.patchUser,
});
export const deleteUser = decarateAsyncThunk({
  type: 'users/deleteUser',
  thunk: httpClient.deleteUser,
});
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    error: null,
    isFetching: false,
    currentUser: null,
  },

  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, pendingReducer);
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.users = data;
    });
    builder.addCase(getAllUsers.rejected, rejectedReducer);

    builder.addCase(getAllUsersMore.pending, pendingReducer);
    builder.addCase(getAllUsersMore.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.users.push(...data);
    });
    builder.addCase(getAllUsersMore.rejected, rejectedReducer);

    builder.addCase(createUser.pending, pendingReducer);
    builder.addCase(createUser.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.users.push(data);
    });
    builder.addCase(createUser.rejected, rejectedReducer);

    builder.addCase(getOneUser.pending, pendingReducer);
    builder.addCase(getOneUser.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.currentUser = data;
    });
    builder.addCase(getOneUser.rejected, rejectedReducer);

    builder.addCase(updateUser.pending, pendingReducer);
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      const index = state.users.findIndex((user) => user._id === data._id);
      state.users[index] = data;
    });
    builder.addCase(updateUser.rejected, rejectedReducer);

    builder.addCase(deleteUser.pending, pendingReducer);
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.users = state.users.filter((user) => user._id !== data._id);
    });
    builder.addCase(deleteUser.rejected, rejectedReducer);
  },
});

export default usersSlice.reducer;
