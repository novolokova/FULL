import React from 'react';
import GroupForm from '../components/GroupForm';
import ControlPanel from '../components/ControlPanel';

const GroupPage = () => {
    return (
        <>
        <div>
             <GroupForm/> 
        </div>

<p>єту панель потом убрать, показівать єту панель если зарегестрированню юзер </p>
<ControlPanel/>

  <div> просмотр всех Group и одного без аунтификации</div>

</>
    );
}

export default GroupPage;
