import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getAllUsersMore } from '../../store/usersSlice';
import CONSTANTS from '../../constants';

const UsersSection = (props) => {
  const [amount, setAmount] = useState(CONSTANTS.MIN_LIMIT);
  const { users, error, isFetching } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    // в компоненте сторонній еффект тільки через useEffect, щоб можна було звернутися
    dispatch(getAllUsers({ offset: 0, limit: amount })); // только через dispatch можна змінити State, на пряму ніяк!!!
  }, [amount, dispatch]);

  return (
    <section>
      <h2>Users List</h2>
      <p>
        {/* вынести функцию */}
        {CONSTANTS.AMOUNTS.map((item, i) => (
          <button key={i} onClick={() => setAmount(item)}>
            {item}
          </button>
        ))}
      </p>
      {error && <h3>error</h3>}
      {isFetching && <h3>Loading...</h3>}
      {users.map((user) => (
        <article key={user.id}>
          <h3>
            {user.firstName} {user.lastName}
          </h3>

          {/* вынести как мини панель  */}
          <section>
            <Link to={`/users/${user.id}`}> getOneUser</Link>

            {/* <button onClick={() => {dispatch(deleteUser(user.id))}}>Remove</button> */}
          </section>
        </article>
      ))}

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
