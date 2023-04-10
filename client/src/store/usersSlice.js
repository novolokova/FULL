import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { decarateAsyncThunk, pendingReducer, rejectedReducer } from './helpers';

//Middleware обробляє побіч.ефф. які впливають на State
export const getAllUsers = decarateAsyncThunk({
  type: 'users/getAllUsers', // назва для devTools-redux-F12
  thunk: httpClient.getUsers, // берем из api axios-запрос
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
  name: 'users', // назва в rootReducer
  initialState: {
    users: [], // fulfilled(data)
    error: null, // reject(error)
    isFetching: false, //pending(loding)
    currentUser: null, //getOneUser
  },
  reducers: {},

    //****** getAllUsers ************ */
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

    //****** getAllUsersMore ************ */
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

    //*****  createUser  ****** */
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

    // ***************getOneUser***********************

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

    //****** updateUser ************ */
    builder.addCase(updateUser.pending, pendingReducer);
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;

      

      // state.users = [...state.users].map((user)=>user.id === data.id?{...user, firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password, birthday: data.birthday, isMale: data.isMale}:user);

        const index = state.users.findIndex(
          (user) => user._id === data._id,
      )
      state.users[index] = data

    
    });
    builder.addCase(updateUser.rejected, rejectedReducer);

    //****** deleteUser ************ */
    builder.addCase(deleteUser.pending, pendingReducer);
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      //1 variant
      //  state.users.splice(data.id, 1);

      //2 variant
      state.users = state.users.filter((user) => user._id !== data._id);
    });
    builder.addCase(deleteUser.rejected, rejectedReducer);
  },
});

export default usersSlice.reducer; // usersSlice.reducer - передаем до rootReducer
