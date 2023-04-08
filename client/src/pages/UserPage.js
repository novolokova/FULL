import React from 'react';
import { Link } from 'react-router-dom';
import UsersSection from '../components/UsersSection/index';



const UserPage = () => {
  return (
    <>
     {/* <p>єту панель потом убрать, показівать єту панель если зарегестрированню юзер </p>
      <ControlPanel/> */}
      <section>
      <Link to='/users/form'>ADDuser</Link>
        <div> просмотр всех юзеров и одного без аунтификации</div>
        <section>  <UsersSection /></section>
      
        
      </section>
    </>
  );
};

export default UserPage;
