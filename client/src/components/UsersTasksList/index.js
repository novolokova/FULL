import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserListTasks } from '../../store/tasksSlice';
import Spinner from '../Spinner';
import Error from '../Error';
import { AddTask } from '@mui/icons-material';
import Modal from '../Modal';
import TaskForm from '../TaskForm';
import TaskCard from '../TaskCard';
import styles from './UsersTasksList.module.scss';

const UsersTasksList = () => {
  const [modalActive, setModalActive] = useState(false);
  const { userListTask, error, isFetching } = useSelector(
    (state) => state.tasks
  );
  const { idUser } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserListTasks(idUser));
  }, [idUser, dispatch]);
  const mapTasks = (tasks, i) => <TaskCard key={i} tasks={tasks} />;
  return (
    <>
      {error && <Error />}
      {isFetching && <Spinner />}
      {userListTask && (
        <>
          <button onClick={() => setModalActive(true)} className={styles.btn}>
            <AddTask className={styles.icon} />
          </button>
          <section className={styles.container}>
          <h1>Author {idUser}: tasks list</h1>
          <div>{userListTask.map(mapTasks)}</div>
          </section>
          <Modal active={modalActive} setActive={setModalActive}>
            <TaskForm idUser={idUser} setActive={setModalActive} />
          </Modal>
        </>
      )}
    </>
  );
};

export default UsersTasksList;
