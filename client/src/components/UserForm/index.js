import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/usersSlice';
import styles from './UserForm.module.scss';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthday: '',
  isMale: true,
};

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values, formikBag) => {
    dispatch(createUser(values));
    navigate('/users', { replace: true });
    formikBag.resetForm();
  };
  return (
    <section className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={styles.fields}>
          <Field
            type="text"
            name="firstName"
            placeholder="firstName"
            className={styles.field}
          />
          <Field
            type="text"
            name="lastName"
            placeholder="lastName"
            className={styles.field}
          />
          <Field
            type="email"
            name="email"
            placeholder="email"
            className={styles.field}
          />
          <Field
            type="password"
            name="password"
            placeholder="password"
            className={styles.field}
          />
          <Field
            type="date"
            name="birthday"
            placeholder="birthday"
            className={styles.field}
          />
          <span className={styles.field}>
            <label> Are you male?</label>{' '}
            <Field type="checkbox" name="isMale" />
          </span>
          <button type="submit" className={styles.submit}>
            {' '}
            Edd{' '}
          </button>
          {/* <ErrorMessage /> */}
        </Form>
      </Formik>
    </section>
  );
};

export default UserForm;
