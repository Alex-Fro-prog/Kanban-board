import React, { useState } from 'react';
import userAvatar from '../images/user-avatar.png';
import arrowUp from '../icons/arrowUp.svg';
import arrowDown from '../icons/arrowDown.svg';
import styles from './ModuleCSS/Header.module.css';


const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.headerContainer}>
        <p className={styles.headerName}>Awesome Kanban Board</p>
        <div className={styles.headerUserMenu}>
          <img className={styles.userAvatar} src={userAvatar} alt="User" />
          <img
            className={styles.userIcons} 
            src={isOpen ? arrowUp : arrowDown} 
            alt="Toggle Menu" 
          />
          {isOpen && (
            <ul className={styles.userList}>
              <li><a href='#'>Profile</a></li>
              <li><a href='#'>Log Out</a></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;