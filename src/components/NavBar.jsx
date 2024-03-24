import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSearch, faUser, faBell } from '@fortawesome/free-solid-svg-icons'; 
import SearchBar from './SearchBar';
import MyCalendar from './MyCalendar';
import LogIn from './LogIn';
import Reminder from './Reminder'; 
import SignUp from './SignUp';

function NavBar({ onSearch }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleIconClick = (menu, event) => {
    const rect = event.target.getBoundingClientRect();
    const position = {
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    };
    setActiveMenu(activeMenu === menu ? null : menu);
    setMenuPosition(position);
  };

  const handleMenuClose = () => {
    setActiveMenu(null);
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className='header'>Task Buddy</h1>
        <div className="icons-container">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" title="Calendar" onClick={(e) => handleIconClick('calendar', e)} />
          <FontAwesomeIcon icon={faSearch} className="icon" title="Search" onClick={(e) => handleIconClick('search', e)} />
          <FontAwesomeIcon icon={faBell} className="icon" title="Reminder" onClick={(e) => handleIconClick('reminder', e)}/>
          <FontAwesomeIcon icon={faUser} className="icon" title="Login" onClick={(e) => handleIconClick('login', e)} />
        </div>
      </nav>
      {activeMenu && (
        <div className="menu-container" style={{ top: menuPosition.y, left: menuPosition.x }}>
          {activeMenu === 'calendar' && <MyCalendar />}
          {activeMenu === 'search' && <SearchBar onSearch={onSearch} />}
          {activeMenu === 'reminder' && <Reminder />}
          {activeMenu === 'login' && <LogIn />}
          <SignUp />
          <button className="close-button" onClick={handleMenuClose}>Close</button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
