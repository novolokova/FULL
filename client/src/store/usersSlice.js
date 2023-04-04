import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as httpClient from "../api";

   //    
export const getAllUsers = createAsyncThunk(
    'users/getAllUsers', //використ. у  devTools - browser F12
async (params={}, thunkAPI)=>{
    try {
        // const {dispatch}= thunkAPI;
     const {data:{data}} = await httpClient.getUsers(params)
     return data
    //  dispatch(loadUsers(data.results))
    } catch (error) { // payloadCreator documentation
        const {rejectWithValue} = thunkAPI;
        return rejectWithValue(error)// прокидаємо далі через rejectWithValue в (extraReducers...rejected )
    }
})

const usersSlice = createSlice({
    name: "users",// назва в rootReducer
    initialState:{
        users:[],// fulfilled(data)
        error: null,// reject(error)
        isFetching:false //pending(loding)
    },
    reducers: {  },
    //обробка відповіді res, promise 3-стани  
    extraReducers:(builder)=>{
        builder.addCase(getAllUsers.pending,(state, action)=>{
            state.isFetching = true;
        })
        builder.addCase(getAllUsers.fulfilled,(state, action)=>{
            state.isFetching = false;
            state.users = action.payload;
        })
        builder.addCase(getAllUsers.rejected,(state, action)=>{
            state.isFetching = false;
            state.error = action.payload;
        })
    }
})
// const {loadUsers} = usersSlice.actions;

export default usersSlice.reducer;