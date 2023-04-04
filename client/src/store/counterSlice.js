import { createSlice } from "@reduxjs/toolkit";


//createSlice - об'єкт який працює с певною частиною стану, в нашому випадку counter  гдобального стану
const counterSlice = createSlice({
    name:"counter",
    initialState: { //default state
        count:0,
        step:1,
    },
    reducers:{// об'єкт який повертає набір методів, який буде працювати з станом нашого counter(мозок)
        increment(state, action){
            state.count+=state.step;
        },
        decrement(state, action){
            state.count-=state.step;
        },
        setStep(state, action){
            const{value}= action.payload;
            state.step = Number(value);
        }
    }
})

export const {increment, decrement, setStep}=counterSlice.actions;// назви actions за назвами методів, TYPE  для action (формуються самостійно за назвами методів у reducers) i фун-ї і actions одночасно!!!
export default counterSlice.reducer; // повертається тільки reducer
// виконує частину з ф-ії counterSlice(counterSlice.reducer)--- 
               //reducer---(те що по default), 