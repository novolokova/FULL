import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getOneUser } from '../../store/usersSlice';

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.users); // взяли частину стейту ot currentUser
  const { idUser } = useParams(); //з нашого http request
  

const dispatch = useDispatch(); 
useEffect(() => {
  dispatch(getOneUser(idUser));
}, [idUser,dispatch])

    return <div>
      <p>getOneUser</p>
      <p>User ID: {currentUser.id}</p>
      <p>User name: {currentUser.firstName} {currentUser.lastName}</p>
      {currentUser.email}
      {/* <div>

      </div> */}
      </div>;
  
};

export default UserProfile;
