import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/usersSlice';

const UsersSection = (props) => {
  const { users, error, isFetching } = useSelector((state) => state.users); // повертає частину нашого State
  const dispatch = useDispatch(); // створює dispatch (посильного)
  useEffect(() => {
    // щоб можно було звернутися до сторонніх ефектів (приймає ф-ю і скільки раз її виконувати)
    dispatch(getAllUsers({ page: 0 })); // page:0 - параметри
  }, [dispatch]);

  return (
    <section>
      <h2>Users List</h2>
      {error && <h3>{JSON.stringify(error)}</h3>}
      {isFetching && <h3>Loading...</h3>}
      {users.map((user, i) => (
        <article key={i}>{JSON.stringify(user)}</article>
      ))}
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
