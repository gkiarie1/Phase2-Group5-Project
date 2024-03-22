import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    // Call the logout function passed from the parent component
    onLogout();
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
