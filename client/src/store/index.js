import { configureStore } from '@reduxjs/toolkit'; // створюємо нашу store
import rootReducer from './rootReducer';

// створює store,  rootReducer(набір reducers)
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        //******загнать все fulfilled
        ignoredActions: ['users/getAllUsers/fulfilled', 'users/getAllUsersMore/fulfilled', 'users/getOneUser/fulfilled', 'users/createUser/fulfilled','users/patchUser/fulfilled', 'users/deleteUser/fulfilled', 'tasks/getAllTasks/fulfilled', 'tasks/getOneTask/fulfilled', 'users/updateTask/fulfilled', 'tasks/getUserTasks/fulfilled', 'tasks/deleteTask/fulfilled' ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

export default store;
