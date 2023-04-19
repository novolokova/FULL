import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { urdateGroup } from '../../store/groupsSlice';
import { GROUP_SCHEMA } from '../../utils/validationSchemas';
import styles from './UrdateGroupForm.module.scss';

const initialValues = {
  name: '',
  descriptition: '',
  image: '',
};
const UrdateGroupForm = () => {
  const { idGroup } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values, formikBag) => {
    dispatch(urdateGroup({ values, idGroup }));
    navigate('/groups', { replace: true });
    formikBag.resetForm();
  };
  return (
    <section className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={GROUP_SCHEMA}
      >
        {(formikProps) => {
          return (
            <Form className={styles.fields}>
              <Field type="text" name="name" placeholder="name" className={styles.field}/>
              <ErrorMessage
                name="name"
                component="span"
                className={styles.spanError}
              />
              <Field
                type="text"
                name="descriptition"
                placeholder="descriptition"
                className={styles.field}
              />
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
                update group
              </button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default UrdateGroupForm;
