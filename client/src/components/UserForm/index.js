import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";

const UserForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
    isMale: true,
  };

  const onSubmit = (values, formikBag) => {};
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Field type="text" name="firstName" placeholder="firstName" />
        <Field type="text" name="lastName" placeholder="lastName" />
        <Field type="email" name="email" placeholder="email" />
        <Field type="password" name="password" placeholder="password" />
        <Field type="date" name="birthday" placeholder="birthday" />
        <label> Are you male?</label> <Field type="checkbox" name="isMale" />
        <button type="submit"> Edd new user</button>
        {/* <ErrorMessage /> */}
      </Form>
    </Formik>
  );
};

export default UserForm;
