import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/groupsSlice';
import Error from '../Error';
import Spinner from '../Spinner';
import GroupCard from '../GroupCard';
import Modal from '../Modal';
import GroupForm from '../GroupForm';
import styles from './GroupSection.module.scss';

const GroupSection = () => {
  const [modalActive, setModalActive] = useState(false);
  const { groups, error, isFetching } = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);
  const mapCards = (groups, i) => <GroupCard key={i} groups={groups} />;
  return (
    <>
      {error && <Error />}
      {isFetching && <Spinner />}
      {groups && (
        <>
          <button onClick={() => setModalActive(true)} className={styles.btn}>
            Add group
          </button>
          <section className={styles.container}>
            <h2 className={styles.title}>Group List</h2>
            <article className={styles.list}>{groups.map(mapCards)}</article>
          </section>
          <Modal active={modalActive} setActive={setModalActive}>
            <GroupForm setActive={setModalActive} />
          </Modal>
        </>
      )}
    </>
  );
};

export default GroupSection;
