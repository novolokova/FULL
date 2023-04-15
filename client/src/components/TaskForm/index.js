import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/tasksSlice';
import styles from './TaskForm.module.scss';

const TaskForm = (props) => {
  const { idUser, setActive } = props;
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(createTask({ idUser, values }));
    setActive(false);
    formikBag.resetForm();
    window.location.replace(`http://localhost:5000/tasks/users/${idUser}`);
  };
  const initialValues = {
    content: '',
  };
  return (
    <section className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={styles.fields}>
          <Field
            type="text"
            name="content"
            placeholder="content"
            className={styles.field}
          />
          <button type="submit" className={styles.submit}>
            Edd task
          </button>
          {/* <ErrorMessage /> */}
        </Form>
      </Formik>
    </section>
  );
};

export default TaskForm;
