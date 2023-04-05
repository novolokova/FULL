import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';

//Middleware
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers', //використ. у  devTools - browser F12
  async (params={}, thunkAPI) => {
    try {
      // после обработки axios повертається {}-деструктур.
      const {
        data: { data },
      } = await httpClient.getUsers(params);
      return data;
      //  dispatch(loadUsers(data.results))
    } catch (error) {
      // payloadCreator documentation
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error); // прокидаємо далі через rejectWithValue в (extraReducers...rejected )
    }
  }
);


export const getAllUsersMore = createAsyncThunk(
  'users/getAllUsersMore', //використ. у  devTools - browser F12
  async (params={}, thunkAPI) => {
    try {
      // после обработки axios повертається {}-деструктур.
      const {
        data: { data },
      } = await httpClient.getUsers(params);
      return data;
      //  dispatch(loadUsers(data.results))
    } catch (error) {
      // payloadCreator documentation
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error); 
    }
  }
);


export const createUser = createAsyncThunk(
  'users/createUser',
  async (values, {rejectWithValue}) => {
    try {
      const {
        data: { data },
      } = await httpClient.postUser(values);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: 'users', // назва в rootReducer
  initialState: {
    users: [], // fulfilled(data)
    error: null, // reject(error)
    isFetching: false, //pending(loding)
  },
  reducers: {},
  //обробка відповіді res, promise 3-стани
  // action це об'єкт в якого є 2 властивості, type(прописує toolkit) i payload(прописю ми)
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.error = null;
      state.isFetching = false;
      state.users=action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });

    //****** ****************** */
    builder.addCase(getAllUsersMore.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getAllUsersMore.fulfilled, (state, action) => {
      state.error = null;
      state.isFetching = false;
      state.users.push(...action.payload);
    });
    builder.addCase(getAllUsersMore.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
    //*****  createUser  ****** */
    builder.addCase(createUser.pending, (state, action) => {
        state.isFetching = true;
        state.error = null;
      });
      builder.addCase(createUser.fulfilled, (state, action) => {
        state.error = null;
        state.isFetching = false;
        state.users.push(action.payload);
      });
      builder.addCase(createUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});


export default usersSlice.reducer;
