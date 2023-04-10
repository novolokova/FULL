import React from 'react';

import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/usersSlice';
// import styles from './UserForm.module.scss';

const UpdateUserForm = (props) => {
  const { idUser, setActive } = props;

  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    setActive(false);
    window.location.replace(`http://localhost:5000/users/${idUser}`);
    dispatch(updateUser({ values, idUser }));
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    birthday: '',
    isMale: true,
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {/* <Form className={styles.fields}> */}
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            margin: 'auto',
            marginTop: '30px',
          }}
        >
          <Field type="text" name="firstName" placeholder="firstName" />
          <Field type="text" name="lastName" placeholder="lastName" />
          <Field type="date" name="birthday" placeholder="birthday" />
          <label> Are you male?</label> <Field type="checkbox" name="isMale" />
          <button type="submit"> update</button>
          {/* <ErrorMessage /> */}
        </Form>
      </Formik>
    </>
  );
};

export default UpdateUserForm;
