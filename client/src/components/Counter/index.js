import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, setStep } from "../../store/counterSlice";

function Counter() {
  const { count, step } = useSelector((state) => state.counter);// дістає зі store частину нашого state
  const dispatch = useDispatch(); // формує потрібний dispatch
  const handlerIncrement = () => dispatch(increment());//
  const handlerDecrement = () => dispatch(decrement());//
  const handlerStep= ({target:{value}})=>dispatch(setStep({value}));
  return (
    <div>
      <h2>count:{count}</h2>
      <button onClick={handlerIncrement}>+</button>
      <button onClick={handlerDecrement}>-</button>
      <p>Step: <input type="number" value={step} onChange={handlerStep}/></p>
    </div>
  );
}

export default Counter;