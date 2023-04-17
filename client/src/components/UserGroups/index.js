import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserGroups } from '../../store/groupsSlice';
import Error from '../Error';
import Spinner from '../Spinner';
import GroupCard from '../GroupCard';
import styles from './UserGroups.module.scss';

const UserGroups = () => {
  const { groupsUser, error, isFetching } = useSelector(
    (state) => state.groups
  );
  const { idUser } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserGroups(idUser));
  }, [idUser, dispatch]);
  const mapGroups = (groups, i) => <GroupCard key={i} groups={groups} />;
  return (
    <>
      {error && <Error />}
      {isFetching && <Spinner />}
      {groupsUser && (
        <section className={styles.container}>
          <h2 className={styles.title}>
            All groups: {groupsUser.firstName} {groupsUser.lastName}
          </h2>
          <article className={styles.list}>{groupsUser.Groups.map(mapGroups)}</article>
        </section>
      )}
    </>
  );
};

export default UserGroups;
