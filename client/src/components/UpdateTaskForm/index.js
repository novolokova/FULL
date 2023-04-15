import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/tasksSlice';
import styles from './UpdateTaskForm.module.scss';

const UpdateTaskForm = () => {
  const { idTask } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values, formikBag) => {
    dispatch(updateTask({ idTask, values }));
    formikBag.resetForm();
    navigate('/tasks', { replace: true });
  };
  const initialValues = {
    content: '',
    isDone: false,
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
          <span className={styles.field}>
            <label> Task done?</label> <Field type="checkbox" name="isDone" />
          </span>
          <button type="submit" className={styles.submit}>
            Update
          </button>
          {/* <ErrorMessage /> */}
        </Form>
      </Formik>
    </section>
  );
};

export default UpdateTaskForm;
