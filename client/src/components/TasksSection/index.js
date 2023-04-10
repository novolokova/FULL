import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks } from '../../store/tasksSlice';
import CONSTANTS from '../../constants';



const TasksSection = () => {
  const { tasks, error, isFetching } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks({ offset: 0, limit: CONSTANTS.MIN_LIMIT }));
 
  }, [dispatch]);

  return (
    <section>
      <h1>Tasks list</h1>
      {error && <h3>error</h3>}
      {isFetching && <h3>Loading...</h3>}
      {tasks.map((task) => (
        <article key={task.id}>
          <h3>
            {task.content}
            {task.isDone === false ? 'NOT-isDone' : 'isDone'}
            <p>author{task.userId}</p>
          </h3>
         { console.log(tasks)} 
          <Link to={`/tasks/users/${task.userId}/${task.id}`}>getOneTask</Link>
       
        
        </article>
      ))}
    </section>
  );
};

export default TasksSection;
