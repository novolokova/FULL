import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['users/getAllUsers/fulfilled', 'users/getAllUsersMore/fulfilled', 'users/getOneUser/fulfilled', 'users/createUser/fulfilled','users/patchUser/fulfilled', 'users/deleteUser/fulfilled', 'tasks/getAllTasks/fulfilled', 'tasks/getOneTask/fulfilled', 'users/updateTask/fulfilled', 'tasks/getUserTasks/fulfilled', 'tasks/deleteTask/fulfilled', 'users/getUserGroups/fulfilled','users/getAllGroups/fulfilled', 'groups/urdateGroup/fulfilled' ],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
});

export default store;
