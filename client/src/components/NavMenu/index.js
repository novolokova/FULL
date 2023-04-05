import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavMenu.module.scss';

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.title}>
        Home Page
      </NavLink>
      <ul>
        <NavLink to="/users">users</NavLink>
        <NavLink to="/groups">groups</NavLink>
        <NavLink to="/tasks">tasks</NavLink>
      </ul>
    </nav>
  );
};

export default NavMenu;
