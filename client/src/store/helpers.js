import { createAsyncThunk } from "@reduxjs/toolkit";

export const decarateAsyncThunk = ({type, thunk}) => {
  const asyncThunk = createAsyncThunk(
    type,
    async (params, { rejectWithValue }) => {
      try {
        return await thunk(params);
      } catch (error) {
        return rejectWithValue(error);// прокидуємо спец.фун.(rejectWithValue) далі в extraReducers до обробки помилки
      }
    }
  );
  return asyncThunk;
};

export const pendingReducer = (state, action) => {
    state.isFetching = true;
    state.error = null;
  };
  
  export const rejectedReducer = (state, action) => {
    state.isFetching = false;
    state.error = action.payload;// прилетіла з Middleware для виводу її кліенту
  };

//******************************* */



//Middleware
// export const getAllUsers = createAsyncThunk(
//     'users/getAllUsers', //використ. у  devTools - browser F12
//     async (params={}, thunkAPI) => {
//       try {
//         // после обработки axios повертається {}-деструктур.
//         const {
//           data: { data },
//         } = await httpClient.getUsers(params);
//         return data;
//         //  dispatch(loadUsers(data.results))
//       } catch (error) {
//         // payloadCreator documentation
//         const { rejectWithValue } = thunkAPI;
//         return rejectWithValue(error); // прокидаємо далі через rejectWithValue в (extraReducers...rejected )
//       }
//     }
//   );