import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks, getAllTasksMore } from '../../store/tasksSlice';
import SearchForm from '../SearchForm';
import TaskCard from '../TaskCard';
import Spinner from '../Spinner';
import Error from '../Error';
import {CONSTANTS} from '../../constants';
import styles from './TasksSection.module.scss';

const TasksSection = () => {
  const { tasks, error, isFetching } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks({ offset: 0, limit: CONSTANTS.MAX_LIMIT }));
  }, [dispatch]);
  const mapTasks = (tasks, i) => <TaskCard key={i} tasks={tasks} />;
  const getMoreUsers = () => {
    dispatch(
      getAllTasksMore({ offset: tasks.length, limit: CONSTANTS.MAX_LIMIT })
    );
  };
  return (
    <>
      {error && <Error />}
      {isFetching && <Spinner />}
      {tasks && (
        <>
          <SearchForm />
          <section className={styles.container}>
            <h1 className={styles.title}>Tasks list</h1>
            <div>{tasks.map(mapTasks)}</div>
            <button className={styles.btn} onClick={getMoreUsers}>
              Load more
            </button>
          </section>
        </>
      )}
    </>
  );
};

export default TasksSection;
