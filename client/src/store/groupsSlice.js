import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { decarateAsyncThunk, pendingReducer, rejectedReducer } from './helpers';

export const createGroup = decarateAsyncThunk({
  type: 'groups/createGroup',
  thunk: httpClient.postGroup,
});
export const getAllGroups = decarateAsyncThunk({
  type: 'users/getAllGroups',
  thunk: httpClient.getAllGroups,
});
export const getUserGroups = decarateAsyncThunk({
  type: 'users/getUserGroups',
  thunk: httpClient.getUserGroups,
});
export const addUserToGroups = decarateAsyncThunk({
  type: 'groups/addUserToGroups',
  thunk: httpClient.addUserToGroups,
});
export const urdateGroup = decarateAsyncThunk({
  type: 'groups/urdateGroup',
  thunk: httpClient.urdateGroup,
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    error: null,
    isFetching: false,
    groupsUser: null,
  },

  extraReducers: (builder) => {
    builder.addCase(createGroup.pending, pendingReducer);
    builder.addCase(createGroup.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.groups.push(data);
    });
    builder.addCase(createGroup.rejected, rejectedReducer);

    builder.addCase(addUserToGroups.pending, pendingReducer);
    builder.addCase(addUserToGroups.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.groups.push(data);
    });
    builder.addCase(addUserToGroups.rejected, rejectedReducer);

    builder.addCase(getAllGroups.pending, pendingReducer);
    builder.addCase(getAllGroups.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.groups = data;
    });
    builder.addCase(getAllGroups.rejected, rejectedReducer);

    builder.addCase(getUserGroups.pending, pendingReducer);
    builder.addCase(getUserGroups.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      state.groupsUser = data;
    });
    builder.addCase(getUserGroups.rejected, rejectedReducer);

    builder.addCase(urdateGroup.pending, pendingReducer);
    builder.addCase(urdateGroup.fulfilled, (state, action) => {
      const {
        payload: {
          data: { data },
        },
      } = action;
      state.error = null;
      state.isFetching = false;
      const index = state.groups.findIndex((group) => group._id === data._id);
      state.groups[index] = data;
    });
    builder.addCase(urdateGroup.rejected, rejectedReducer);
  },
});

export default groupsSlice.reducer;
