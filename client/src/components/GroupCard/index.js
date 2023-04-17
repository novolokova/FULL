import React from 'react';
import { useState } from 'react';
import { FamilyRestroom, NoAdultContent, PersonAdd } from '@mui/icons-material';
import Modal from '../Modal';
import AddToGroupForm from '../AddToGroupForm';
import { REQUEST_DATA } from '../../constants';
import styles from './GroupCard.module.scss';

const { PORT_SERVER, HOST } = REQUEST_DATA;

const GroupCard = (props) => {
  const {
    groups: { id, name, imagePath, descriptition, isAdult },
    i,
  } = props;
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <div key={i} className={styles.card}>
        <div className={styles.wrapImage}>
          <img
            src={`${HOST}:${PORT_SERVER}/images/${imagePath}`}
            alt={`${name}`}
            className={styles.image}
          />
        </div>
        <div className={styles.container}>
          <h3>{name}</h3>
          <p>descriptition: {descriptition}</p>
          <div className={styles.iconContainer}>
            {isAdult ? (
              <NoAdultContent className={styles.icon} />
            ) : (
              <FamilyRestroom className={styles.icon} />
            )}
            <button onClick={() => setModalActive(true)} className={styles.btn}>
              <PersonAdd />
            </button>
          </div>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <AddToGroupForm idGroup={id} setActive={setModalActive} />
      </Modal>
    </>
  );
};

export default GroupCard;
