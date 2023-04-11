import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getAllUsersMore } from '../../store/usersSlice';
import CONSTANTS from '../../constants';
import Spinner from '../Spinner';
import Error from '../Error';

const UsersSection = () => {
  const [amount, setAmount] = useState(CONSTANTS.MIN_LIMIT);
  const { users, error, isFetching } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers({ offset: 0, limit: amount }));
  }, [amount, dispatch]);

  return (
    <section>
      <div>
        {/* вынести функцию */}
        {CONSTANTS.AMOUNTS.map((item, i) => (
          <button key={i} onClick={() => setAmount(item)}>
            {item}
          </button>
        ))}
      </div>
      {error && <Error />}
      {isFetching && <Spinner />}
      {users && 
        <>
          <h2>Users List</h2>
          {/* вынести функцию */}
          {users.map((user) => (
            <article key={user.id}>
              <h3>
                {user.firstName} {user.lastName}
              </h3>            
              <section>
                <Link to={`/users/${user.id}`}> getOneUser</Link>               
              </section>
            </article>
          ))}
        </>
      }

      {/* вынести функцию */}
      <button
        onClick={() => {
          dispatch(getAllUsersMore({ offset: users.length, limit: amount }));
        }}
      >
        Load more
      </button>
    </section>
  );
};

export default UsersSection;
