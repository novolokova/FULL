import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { PersonSearch, Search } from '@mui/icons-material';
import Modal from '../Modal';
import styles from './SearchForm.module.scss';

const initialValues = {
  idUser: '',
};

const SearchForm = (props) => {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const openMadal = () => setModalActive(true);
  const onSubmit = (values, formikBag) => {
    values.idUser
      ? navigate(`/tasks/users/${values.idUser}`, { replace: true })
      : setModalActive(false);
    formikBag.resetForm();
  };
  return (
    <>
      <button onClick={openMadal} className={styles.btn}>
        <PersonSearch className={styles.btnIcon} />
      </button>
      <Modal active={modalActive} setActive={setModalActive}>
        <section className={styles.modal}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formikProps) => {
              return (
                <Form>
                  <Field
                    type="number"
                    name="idUser"
                    placeholder="Enter id user"
                  />
                  <button type="submit" className={styles.icon}>
                    <Search />
                  </button>
                </Form>
              );
            }}
          </Formik>
        </section>
      </Modal>
    </>
  );
};

export default SearchForm;
