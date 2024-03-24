import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;