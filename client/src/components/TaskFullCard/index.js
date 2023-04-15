import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Done, RemoveDone } from '@mui/icons-material';
import { getOneTask } from '../../store/tasksSlice';
import styles from './TaskFullCard.module.scss';

const TaskFullCard = () => {
  const { currentTask, error, isFetching } = useSelector(
    (state) => state.tasks
  );
  const { idUser, idTask } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneTask({ idUser, idTask }));
  }, [idUser, idTask, dispatch]);

  return (
    <>
      {error && (
        <>
          <h3>Task not faund</h3>
          <Link to="/tasks">вернуться к списку </Link>
        </>
      )}
      {isFetching && <h3>Loading...</h3>}
      {currentTask && (
        <article className={styles.container}>
          <h2>TaskProfile</h2>
          <p>Id task: {currentTask.id}</p>
          <p>Author: {currentTask.userId}</p>
          <p>Content: {currentTask.content}</p>
          <p>Create: {currentTask.createdAt}</p>
          <p>dead line: {currentTask.deadLine}</p>
          {currentTask.isDone ? (
            <Done className={styles.done} />
          ) : (
            <RemoveDone className={styles.notDone} />
          )}
        </article>
      )}
    </>
  );
};

export default TaskFullCard;
