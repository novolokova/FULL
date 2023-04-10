import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneUser, deleteUser } from '../../store/usersSlice';
import UpdateUserForm from '../UpdateUserForm';
import Modal from '../Modal';
import styles from './UserProfile.module.scss';


const UserProfile = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { currentUser, error, isFetching } = useSelector(
    (state) => state.users
  );

  const { idUser } = useParams();

  const deleteUserAction = (idUser) => {
    console.log(idUser)
    dispatch(deleteUser(idUser));
    setModalDelete(false);
    window.location.replace('http://localhost:5000/users');
  };

  const removeUser = (idUser) => {
   
    setModalDelete(true)
    
  };
  const cancel = ()=>{
    setModalDelete(false)
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneUser(idUser));
  }, [idUser, dispatch]);

  return (
    <>
      {error && (
        <>
          <h3>User not faund</h3>
          <Link to="/users">вернуться к списку </Link>
        </>
      )}
      {isFetching && <h3>Loading...</h3>}
      {
        // посмотреть в примерах как привьльно делать рендер
        currentUser && (
          <>
            {/* вывести карточку          */}
            <p>User ID: {currentUser.id}</p>
            <p>
              User name: {currentUser.firstName} {currentUser.lastName}
            </p>
            {currentUser.email}

            <button
              onClick={() => {
                removeUser(currentUser.id);

              }}
            >
              delete
            </button>
            
            <button onClick={() => setModalActive(true)}>update</button>
          
            <Modal active={modalActive} setActive={setModalActive}>
            <UpdateUserForm idUser={currentUser.id} setActive={setModalActive}/>
            </Modal>

            <Modal active={modalDelete} setActive={setModalDelete}>
            <p>'Are you sure wanna delete this user ?'</p>
            <button onClick={deleteUserAction}>Yes</button>
            <button onClick={cancel}>No</button>
            </Modal>








          </>
        )
      }
    </>
  );
};

export default UserProfile;
