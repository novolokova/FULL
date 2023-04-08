import React from 'react';
import {Link } from 'react-router-dom';
import {  Field, Form, Formik } from 'formik';
import {useDispatch} from 'react-redux'
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
  const onSubmit = (values, formikBag) => {
    console.log(values);
    dispatch(createUser(values))// закидываем в middlewar данные
      // formikBag.resetForm()
  };
  return (

    <>



    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className={styles.fields}>
      {/* <Form style={{
           display: 'flex',
           flexDirection: 'column',
           width: '400px',
           margin: 'auto',
           marginTop: '30px'
      }}> */}
        <Field type="text" name="firstName" placeholder="firstName" />
        <Field type="text" name="lastName" placeholder="lastName" />
        <Field type="email" name="email" placeholder="email" />
        <Field type="password" name="password" placeholder="password" />
        <Field type="date" name="birthday" placeholder="birthday" />
        <label> Are you male?</label> <Field type="checkbox" name="isMale" />
        {/* <Link to='/users'><button type="submit"> Edd new user</button></Link> */}
        {/* после валидации, сообщить о успешном создании и перенести на страницу желательно этого юзера */}
       <button type="submit"> Edd new user</button>
        {/* <ErrorMessage /> */}
      </Form>
    </Formik>

    <p>после удачного заполнения формі должно редеректнуть на профиль єтого нового юзера</p>
    </>
  );
};

export default UserForm;
