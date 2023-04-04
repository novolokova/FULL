import React from "react";
import PropTypes from "prop-types";
import { MODE_TYPE } from "../todoConstants";

/**
 *
 * @param {*} props
 * @param {string} props.mode
 * @param {func} props.handleMode
 * @returns
 */
const SelectTodo = (props) => {
  const { mode, handleMode } = props;
  // const MODE_TYPE = ["ALL", "DO", "DONE"];
  return (
    <select value={mode} onChange={handleMode}>
      {MODE_TYPE.map((type, i) => (
        <option key={i} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};
SelectTodo.propTypes = {
  mode: PropTypes.string.isRequired,
  handleMode: PropTypes.func.isRequired,
};

export default SelectTodo;
