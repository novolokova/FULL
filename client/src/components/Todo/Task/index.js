import React from "react";
import PropTypes from "prop-types";

/**
 * @param {*} props.
 * @param {[]} props.task
 * @param {func} props.handleDelete
 * @param {func} props.handleIsDone
 *
 * @returns
 */
const Task = (props) => {
  const { task, handleDelete, handleIsDone } = props;
  return (
    <li>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => handleIsDone(task.id)}
      />
      {task.body}
      <button onClick={() => handleDelete(task.id)}>X</button>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.array,
  handleDelete: PropTypes.func.isRequired,
  handleIsDone: PropTypes.func.isRequired,
};

export default Task;
