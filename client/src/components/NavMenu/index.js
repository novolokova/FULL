import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavMenu.module.scss';

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/" className={styles.title}>Home Page</NavLink>
        </li>
        <li>
          <NavLink to="/users">users</NavLink>
        </li>
        <li>
          <NavLink to="/groups">groups</NavLink>
        </li>
        <li>
          <NavLink to="/tasks">tasks</NavLink>
        </li>
      </ul>
      <div>сделать аутентификацию</div>
    </nav>
  );
};

export default NavMenu;
