import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import todoReducer from "./todoSlice";
import usersReducer from "./usersSlice"
import groupsReducer from "./groupsSlice"


const rootReducer = combineReducers({
    counter:counterReducer, // бере функції з counterSlice.reducer(по default)       
    todo: todoReducer,// бере функції з todoSlice 
    users: usersReducer, // бере функції з usersSlice(логіка керування нашого стану)
    groups: groupsReducer,
})


export default rootReducer; 

