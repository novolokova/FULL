import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/usersSlice';
import { UPDATE_SCHEMA } from '../../utils/validationSchemas';
import { REQUEST_DATA } from '../../constants';
import styles from './UpdateUserForm.module.scss';

const { PORT_CLIENT, HOST } = REQUEST_DATA;

const UpdateUserForm = (props) => {
  const { idUser, setActive } = props;
  const {
    currentUser: { firstName, lastName, birthday },
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    setActive(false);
    dispatch(updateUser({ values, idUser }));
    formikBag.resetForm();
    window.location.replace(`${HOST}:${PORT_CLIENT}/users/${idUser}`);
  };
  const initialValues = {
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    birthday: `${birthday}`,
    isMale: true,
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={UPDATE_SCHEMA}
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
        </Form>
      </Formik>
    </>
  );
};

export default UpdateUserForm;
