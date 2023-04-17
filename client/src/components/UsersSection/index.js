import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PersonAddAlt } from '@mui/icons-material';
import { getAllUsers, getAllUsersMore } from '../../store/usersSlice';
import Spinner from '../Spinner';
import Error from '../Error';
import UserCard from '../UserCard';
import {CONSTANTS} from '../../constants';
import styles from './UsersSection.module.scss';

const UsersSection = () => {
  const [amount, setAmount] = useState(CONSTANTS.MIN_LIMIT);
  const { users, error, isFetching } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers({ offset: 0, limit: amount }));
  }, [amount, dispatch]);
  const getMoreUsers = () => {
    dispatch(getAllUsersMore({ offset: users.length, limit: amount }));
  };
  const btnAmount = (setAmount) => {
    return CONSTANTS.AMOUNTS.map((item, i) => (
      <button
        key={i}
        className={styles.btn}
        onClick={() => {
          setAmount(item);
        }}
      >
        {item}
      </button>
    ));
  };
  const mapCards = (users, i) => <UserCard key={i} users={users} />;
  return (
    <>
      {error && <Error />}
      {isFetching && <Spinner />}
      {users && (
        <>
          <div className={styles.linkWrap}>
            <Link to="/users/form">
              <PersonAddAlt className={styles.personAdd} />
            </Link>
          </div>
          <section className={styles.container}>
            {btnAmount(setAmount)}
            <h2 className={styles.title}>Users List</h2>
            <article className={styles.list}>{users.map(mapCards)}</article>
            <button className={styles.btn} onClick={getMoreUsers}>
              Load more
            </button>
          </section>
        </>
      )}
    </>
  );
};

export default UsersSection;
