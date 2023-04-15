import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonSearch, Search } from '@mui/icons-material';
import Modal from '../Modal';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
  const [value, setValue] = useState('');
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <button onClick={() => setModalActive(true)} className={styles.btn}>
        <PersonSearch className={styles.btnIcon} />
      </button>
      <Modal active={modalActive} setActive={setModalActive}>
        <section className={styles.modal}>
          <p>Enter id author </p>
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          ></input>
          <Link to={`/tasks/users/${value}`} >
            <Search className={styles.icon}/>
          </Link>
        </section>
      </Modal>
    </>
  );
};

export default SearchForm;
