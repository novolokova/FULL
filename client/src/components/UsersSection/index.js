import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getAllUsersMore } from '../../store/usersSlice';
import CONSTANTS from '../../constants';

const UsersSection = (props) => {
  const [amount, setAmount] = useState(CONSTANTS.MIN_LIMIT);
  const { users, error, isFetching } = useSelector((state) => state.users); // повертає частину нашого State
  const dispatch = useDispatch(); // створює dispatch (посильного)
  useEffect(() => {
    dispatch(getAllUsers({ offset: 0, limit: amount }));
        // eslint-disable-next-line
  }, [amount, dispatch]);

  return (
    <section>
      <h2>Users List</h2>
      <p>
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
        </article>
      ))}
      <button
        onClick={() => {dispatch(getAllUsersMore({ offset: users.lenght, limit: amount }));
        }}
      >
        Load more
      </button>
    </section>
  );
};

export default UsersSection;

//************************* Add example connect (HOC)  ***************************** */

// import React, {useEffect} from "react";
// import { connect } from "react-redux";
// import { getAllUsers } from "../../store/usersSlice";

// const UsersSection = (props) => {
//   const { users, error, isFetching, loadedUsers } = props;
//   useEffect(()=>{
//     loadedUsers()
//   }, [loadedUsers])
//   return (
//     <section>
//       <h2>Users List</h2>
//       {error && <h3>Error!</h3>}
//       {isFetching && <h3>Loading...</h3>}
//       {users.map((user, i) => (
//         <article key={i}>{JSON.stringify(user)}</article>
//       ))}
//     </section>
//   );
// };

// const mapStateToProps = (state) => state.users; //initialState || state from usersSlice
// const mapDispatchToProps = (dispatch) => ({
//   loadedUsers: (params)=>dispatch(getAllUsers(params))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(UsersSection);
