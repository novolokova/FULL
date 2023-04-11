import React from 'react';
import styles from './UserFullCard.module.scss';

const UserFullCard = (props) => {
  const {
    currentUser: { firstName, lastName, isMale, birthday },
  } = props;

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        {isMale ? (
          <img src="/images/men-avatar.svg" alt="men-avatar-icon" />
        ) : (
          <img src="/images/woman-avatar.svg" alt="woman-avatar-icon" />
        )}
      </div>
      <div className={styles.container}>
        <p>first Name: {firstName}</p>
        <p>last Name: {lastName}</p>
        <p>birthday: {birthday} </p>
      </div>
    </div>
  );
};

export default UserFullCard;
