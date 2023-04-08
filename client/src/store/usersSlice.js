import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { decarateAsyncThunk, pendingReducer, rejectedReducer } from './helpers';

//Middleware обробляє побіч.ефф. які впливають на State
export const getAllUsers = decarateAsyncThunk({
  type: 'users/getAllUsers',// назва для devTools-redux-F12
  thunk: httpClient.getUsers,// берем из api axios-запрос
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


const usersSlice = createSlice({
  name: 'users', // назва в rootReducer
  initialState: {
    users: [], // fulfilled(data)
    error: null, // reject(error)
    isFetching: false, //pending(loding)
    currentUser: [], //getOneUser
  },
  reducers: {},
  //обробка відповіді res, promise 3-стани
  // action це об'єкт в якого є 2 властивості, type(прописує toolkit) i payload(пропис. ми)
  extraReducers: (builder) => {// обробляємо наш promice
    builder.addCase(getAllUsers.pending, pendingReducer);
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      const {payload:{data:{data}}} = action;
      state.error = null; 
      state.isFetching = false;
      state.users = data;
    });
    builder.addCase(getAllUsers.rejected, rejectedReducer);

    //****** getAllUsersMore ************ */
    builder.addCase(getAllUsersMore.pending, pendingReducer);
    builder.addCase(getAllUsersMore.fulfilled, (state, action) => {
      const {payload:{data:{data}}} = action;
      state.error = null;
      state.isFetching = false;
      state.users.push(...data);
    });
    builder.addCase(getAllUsersMore.rejected, rejectedReducer);
    //*****  createUser  ****** */
    builder.addCase(createUser.pending, pendingReducer);
    builder.addCase(createUser.fulfilled, (state, action) => {
      const {payload:{data:{data}}} = action;
      state.error = null;
      state.isFetching = false;
      state.users.push(data);
    });
    builder.addCase(createUser.rejected, rejectedReducer);


// ***************getOneUser***********************

builder.addCase(getOneUser.pending, pendingReducer);
builder.addCase(getOneUser.fulfilled, (state, action) => {
  const {payload:{data:{data}}} = action;
  state.error = null; 
  state.isFetching = false;
  state.currentUser = data;
});
builder.addCase(getOneUser.rejected, rejectedReducer);



  },



  
});










export default usersSlice.reducer;// usersSlice.reducer - передаем до rootReducer
