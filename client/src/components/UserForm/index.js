import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/usersSlice';
import { USER_FORM_SCHEMA } from '../../utils/validationSchemas';
import styles from './UserForm.module.scss';

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values, formikBag) => {
    dispatch(createUser(values));
    navigate('/users', { replace: true });
    formikBag.resetForm();
  };
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    isMale: true,
  };
  return (
    <section className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={USER_FORM_SCHEMA}
      >
        <Form className={styles.fields}>
          <Field
            type="text"
            name="firstName"
            placeholder="firstName"
            className={styles.field}
          />
          <ErrorMessage
            name="firstName"
            component="span"
            className={styles.spanError}
          />
          <Field
            type="text"
            name="lastName"
            placeholder="lastName"
            className={styles.field}
          />
          <ErrorMessage
            name="lastName"
            component="span"
            className={styles.spanError}
          />
          <Field
            type="email"
            name="email"
            placeholder="email"
            className={styles.field}
          />
          <ErrorMessage
            name="email"
            component="span"
            className={styles.spanError}
          />
          <Field
            type="password"
            name="password"
            placeholder="password"
            className={styles.field}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={styles.spanError}
          />
          <Field
            type="date"
            name="birthday"
            placeholder="birthday"
            className={styles.field}
          />
          <span className={styles.field}>
            <label> Are you male?</label>
            <Field type="checkbox" name="isMale" />
          </span>
          <button type="submit" className={styles.submit}>
            Edd
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default UserForm;
