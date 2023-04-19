import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addUserToGroups } from '../../store/groupsSlice';
import styles from './AddToGroupForm.module.scss';

const AddToGroupForm = (props) => {
  const { idGroup, setActive } = props;
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(addUserToGroups({ idGroup, values }));
    setActive(false);
    formikBag.resetForm();
  };
  const initialValues = {
    userId: '',
  };
  return (
    <section className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={styles.fields}>
          <Field
            type="number"
            name="userId"
            placeholder="id user"
            className={styles.field}
          />
          <button type="submit" className={styles.submit}>
            Edd to group
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default AddToGroupForm;
