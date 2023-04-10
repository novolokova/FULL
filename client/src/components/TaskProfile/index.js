import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getOneTask, deleteTask } from '../../store/tasksSlice';

const TaskProfile = () => {
  const { currentTask, error, isFetching } = useSelector(
    (state) => state.tasks
  );
  const { idUser, idTask } = useParams(); //з нашого http request

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
        <>
          <p>TaskProfile</p>
          {currentTask.content}
          <button
            onClick={() => {
              console.log(idUser);
              dispatch(deleteTask({ idUser, idTask }));
            }}
          >
            delete
          </button>
          <button onClick={() => {}}>update</button>
        </>
      )}
    </>
  );
};

export default TaskProfile;
