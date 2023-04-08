import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import GroupPage from './pages/GroupPage';
import TaskPage from './pages/TaskPage';
import NavMenu from './components/NavMenu';
import UserProfile from './components/UserProfile';
import UserForm from './components/UserForm';
// import UsersNavMenu from './components/UsersNavMenu';



function App() {
  // const { pathname } = useLocation();

  return (
    <BrowserRouter>
      <NavMenu />
      {/* {pathname ==='/users' && <UsersNavMenu/>} 
      {pathname ==='/groups' && <h3>Loading...</h3>}
      {pathname ==='/tasks' && <h3>Loading...</h3>}  */}
      {/* <UsersNavMenu/> сделать условный рендер, или как в дз по формам */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/tasks" element={<TaskPage />} />

        <Route path="/users/:idUser" element={<UserProfile />} />
        <Route path="/users/form" element={<UserForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
