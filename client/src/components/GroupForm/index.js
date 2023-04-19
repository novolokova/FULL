import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../store/groupsSlice';
import { GROUP_SCHEMA } from '../../utils/validationSchemas';
import styles from './GroupForm.module.scss';

const GroupForm = (props) => {
  const { setActive } = props;
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    values.userId = 1;
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
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={GROUP_SCHEMA}>
        {(formikProps) => {
          return (
            <Form className={styles.fields}>
              <Field type="text" name="name" placeholder="name" />
              <ErrorMessage name="name" component="span" className={styles.spanError}/>
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
