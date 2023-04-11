import React from 'react';
// import {AcUnitIcon} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.scss';


const UserCard = (props) => {
  const { users:{id, firstName, lastName, isMale}, i } = props;

  return (
    <div key={i} className={styles.card}>
      <div className={styles.avatar}>
        {isMale ? (
          <img src="/images/men-avatar.svg" alt="men-avatar-icon" />
        ) : (
          <img src="/images/woman-avatar.svg" alt="woman-avatar-icon" />
        )}
      </div>
      <div className={styles.container}>
        <h3>
          {firstName}
          <br />
          {lastName}
          <Link to={`/users/${id}`}> **** </Link>{' '}
        </h3>
      </div>
    </div>
  );
};

export default UserCard;
