import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Groups } from '@mui/icons-material';
import { getOneUser, deleteUser } from '../../store/usersSlice';
import UpdateUserForm from '../UpdateUserForm';
import Modal from '../Modal';
import Error from '../Error';
import Spinner from '../Spinner';
import UserFullCard from '../UserFullCard';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { currentUser, error, isFetching } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();
  const { idUser } = useParams();
  const deleteUserAction = (idUser) => {
    dispatch(deleteUser(idUser));
    setModalDelete(false);
    navigate('/users', { replace: true });
  };
  const removeUser = () => {
    setModalDelete(true);
  };
  const cancel = () => {
    setModalDelete(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneUser(idUser));
  }, [idUser, dispatch]);
  return (
    <>
      {error && <Error />}
      {isFetching && <Spinner />}
      {currentUser && (
        <>
          <section className={styles.container}>
            <UserFullCard currentUser={currentUser} />
            <div className={styles.containerBtn}>
              <button onClick={removeUser} className={styles.btn}>
                delete
              </button>
              <button
                onClick={() => setModalActive(true)}
                className={styles.btn}
              >
                update
              </button>
              <Link to={`/groups/users/${idUser}`} className={styles.btn}>
                <Groups className={styles.icon}/>
              </Link>
            </div>
          </section>
          <Modal active={modalActive} setActive={setModalActive}>
            <UpdateUserForm
              idUser={currentUser.id}
              setActive={setModalActive}
            />
          </Modal>
          <Modal active={modalDelete} setActive={setModalDelete}>
            <section className={styles.modal}>
              <p>Are you sure wanna delete this user ?</p>
              <button
                onClick={() => deleteUserAction(idUser)}
                className={styles.btn}
              >
                Yes
              </button>
              <button onClick={cancel} className={styles.btn}>
                No
              </button>
            </section>
          </Modal>
        </>
      )}
    </>
  );
};

export default UserProfile;
