import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/tasksSlice';
import { CONTENT_SCHEMA } from '../../utils/validationSchemas';
import styles from './UpdateTaskForm.module.scss';

const initialValues = {
  content: '',
  isDone: false,
};

const UpdateTaskForm = (props) => {
  const { idTask } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values, formikBag) => {
    dispatch(updateTask({ idTask, values }));
    formikBag.resetForm();
    navigate('/tasks', { replace: true });
  };
  return (
    <section className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={CONTENT_SCHEMA}
      >
        {(formikProps) => {
          return (
            <Form className={styles.fields}>
              <Field
                type="text"
                name="content"
                placeholder="content"
                className={styles.field}
              />
              <ErrorMessage
                name="content"
                component="span"
                className={styles.spanError}
              />
              <span className={styles.field}>
                <label> Task done?</label>
                <Field type="checkbox" name="isDone" />
              </span>
              <button type="submit" className={styles.submit}>
                Update
              </button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default UpdateTaskForm;
