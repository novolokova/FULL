import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  isDoneTask,
  setMode,
} from "../../store/todoSlice";
import Task from "./Task";
import SelectTodo from "./SelectTodo";
import FormTodo from "./FormTodo";
import { MODE } from "./todoConstants";

const Todo = () => {
  const { tasks, mode } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(addTask({ value: values.body }));
    formikBag.resetForm();
  };
  const handleIsDone = (id) => {
    dispatch(isDoneTask({ id }));
  };
  const handleDelete = (id) => {
    dispatch(deleteTask({ id }));
  };
  const handleMode = ({ target: { value } }) => dispatch(setMode({ value }));
  const mapTask = (task) => {
    if (mode === MODE.DONE && task.isDone) {
      return (
        <Task
          key={task.id}
          task={task}
          handleIsDone={handleIsDone}
          handleDelete={handleDelete}
        />
      );
    } else if (mode === MODE.DO && task.isDone === false) {
      return (
        <Task
          key={task.id}
          task={task}
          handleIsDone={handleIsDone}
          handleDelete={handleDelete}
        />
      );
    } else if (mode === MODE.ALL) {
      return (
        <Task
          key={task.id}
          task={task}
          handleIsDone={handleIsDone}
          handleDelete={handleDelete}
        />
      );
    }
  };
  return (
    <>
      <section>
        <FormTodo onSubmit={onSubmit} />
        <SelectTodo mode={mode} handleMode={handleMode} />
      </section>
      <section>
        <h2>Tasks List</h2>
        <ol>{tasks.map(mapTask)}</ol>
      </section>
    </>
  );
};

export default Todo;
