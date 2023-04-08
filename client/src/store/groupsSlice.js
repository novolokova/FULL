import { createSlice } from "@reduxjs/toolkit";
import * as httpClient from "../api";
import { decarateAsyncThunk, pendingReducer, rejectedReducer } from "./helpers";


// зробити усі запити та прописати extraReducers

//******************** */


export const createGroup = decarateAsyncThunk({
  type: "groups/createGroup",
  thunk: httpClient.postGroup,
});

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    error: null,
    isFetching: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGroup.pending, pendingReducer);
    builder.addCase(createGroup.fulfilled, (state, action) => {
      const {payload:{data:{data}}} =action;
      state.error = null;
      state.isFetching = false;
      state.groups.push(data);
    });
    builder.addCase(createGroup.rejected, rejectedReducer);
  },
});
 
export default groupsSlice.reducer;