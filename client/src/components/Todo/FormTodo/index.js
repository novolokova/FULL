import React from "react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";

/**
 *
 * @param {*} props
 * @param {func} props.onSubmit
 * @returns
 */
const FormTodo = (props) => {
  const { onSubmit } = props;
  return (
    <Formik onSubmit={onSubmit} initialValues={{ body: "" }}>
      <Form>
        <Field name="body" />
        <input type="submit" value="Add task" />
      </Form>
    </Formik>
  );
};
FormTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default FormTodo;
