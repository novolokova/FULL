import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  Done,
  RemoveDone,
  FormatAlignCenter,
  DriveFileRenameOutline,
  DeleteOutline,
} from '@mui/icons-material';
import { deleteTask } from '../../store/tasksSlice';
import Modal from '../Modal';
import { REQUEST_DATA } from '../../constants';
import styles from './TaskCard.module.scss';

const { PORT_CLIENT, HOST } = REQUEST_DATA;

const TaskCard = (props) => {
  const {
    tasks: { id, content, isDone, userId },
    i,
  } = props;
  const [modalDelete, setModalDelete] = useState(false);
  const dispatch = useDispatch();
  const deleteTasksAction = (userId, id) => {
    dispatch(deleteTask({ userId, id }));
    setModalDelete(false);
    window.location.replace(`${HOST}:${PORT_CLIENT}/tasks`);
  };
  const removeTask = () => {
    setModalDelete(true);
  };
  const cancel = () => {
    setModalDelete(false);
  };
  return (
    <>
      <section key={i} className={styles.container}>
        <h2>{id}</h2>
        <article className={styles.content}>
          <h3>Author: {userId}</h3>
          <p>{content}</p>
        </article>
        <Link to={`/tasks/users/${userId}/${id}`}>
          <FormatAlignCenter className={styles.icon} />
        </Link>
        <Link to={`/tasks/${id}`}>
          <DriveFileRenameOutline className={styles.icon} />
        </Link>
        <button onClick={() => removeTask()} className={styles.btn}>
          <DeleteOutline />
        </button>
        {isDone ? (
          <Done className={styles.done} />
        ) : (
          <RemoveDone className={styles.notDone} />
        )}
      </section>
      <Modal active={modalDelete} setActive={setModalDelete}>
        <section className={styles.modal}>
          <p>Are you sure wanna delete task {id} ?</p>
          <button
            onClick={() => deleteTasksAction(userId, id)}
            className={styles.btnModal}
          >
            Yes
          </button>
          <button onClick={cancel} className={styles.btnModal}>
            No
          </button>
        </section>
      </Modal>
    </>
  );
};

export default TaskCard;
