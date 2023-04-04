import { configureStore } from '@reduxjs/toolkit'// створюємо нашу store

import rootReducer from './rootReducer';


// створює store,  в неї може бути багато reducer, rootReducer(набір reducers)
const store = configureStore({
    reducer:rootReducer,
})


export default store; 