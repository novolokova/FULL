import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import GroupPage from './pages/GroupPage';
import TaskPage from './pages/TaskPage';
import NavMenu from './components/NavMenu';
import UserProfile from './components/UserProfile';
import UserForm from './components/UserForm';
import UpdateTaskForm from './components/UpdateTaskForm';
import UsersTasksList from './components/UsersTasksList';
import TaskFullCard from './components/TaskFullCard';
import UserGroups from './components/UserGroups';
import UrdateGroupForm from './components/UrdateGroupForm';

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/:idUser" element={<UserProfile />} />
        <Route path="/users/form" element={<UserForm />} />

        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/tasks/users/:idUser/:idTask" element={<TaskFullCard />} />
        <Route path="/tasks/:idTask" element={<UpdateTaskForm />} />
        <Route path="/tasks/users/:idUser" element={<UsersTasksList />} />

        <Route path="/groups" element={<GroupPage />} />
        <Route path="/groups/users/:idUser" element={<UserGroups />} />
        <Route path="/groups/:idGroup/image" element={<UrdateGroupForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
