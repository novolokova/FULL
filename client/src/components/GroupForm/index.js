import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../store/groupsSlice';
import styles from './GroupForm.module.scss';

const GroupForm = (props) => {
  const { setActive } = props;
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    values.userId = 1;
    //1 -> state.authUser.id повинні знати, окремий стейт для зареестрованого користувача, створити в сторі окремий слайс для авторизованого юзера, перевірили його і він може щось робити і знаемо його userId і вже зможемо робити від його імені запити...
    // console.log(values);
    dispatch(createGroup(values));
    setActive(false);
    formikBag.resetForm();
  };
  const initialValues = {
    name: '',
    image: '',
  };
  return (
    <section className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formikProps) => {
          return (
            <Form className={styles.fields}>
              <Field type="text" name="name" placeholder="name" />
              <label>
                <input
                  type="file"
                  name="image"
                  onChange={({ target }) =>
                    formikProps.setFieldValue('image', target.files[0])
                  }
                  className={styles.field}
                />
              </label>
              <button type="submit" className={styles.submit}>
                add new group
              </button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default GroupForm;
