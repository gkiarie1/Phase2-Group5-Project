import React, { useState } from 'react';

function LogIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://json-server-users-task-manager.onrender.com/users?email=${email}`);
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const userData = await response.json();
      if (userData.length === 0 || userData[0].password !== password) {
        throw new Error('Invalid credentials');
      }
      
      onLogin();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default LogIn;
