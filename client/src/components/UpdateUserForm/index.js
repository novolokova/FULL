import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/usersSlice';
import styles from './UpdateUserForm.module.scss';

const UpdateUserForm = (props) => {
  const { idUser, setActive } = props;
  const { currentUser:{firstName, lastName, birthday} } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    setActive(false);
    window.location.replace(`http://localhost:5000/users/${idUser}`);
    dispatch(updateUser({ values, idUser }));
    formikBag.resetForm();
  };
  const initialValues = {
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    birthday: `${birthday}`,
    isMale: true,
  };
  return (
    <>
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
            type="date"
            name="birthday"
            placeholder="birthday"
            className={styles.field}
          />
          <span className={styles.field}>
            <label> Is male</label> <Field type="checkbox" name="isMale" />
          </span>
          <button type="submit" className={styles.submit}>
            update
          </button>
          {/* <ErrorMessage /> */}
        </Form>
      </Formik>
    </>
  );
};

export default UpdateUserForm;
