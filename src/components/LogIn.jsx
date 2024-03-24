import React, { useState } from 'react';
import SignUp from './SignUp';
import App from './App'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://json-server-users-task-manager.onrender.com/users?email=${email}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            if (userData.length === 0 || userData[0].password !== password) {
                throw new Error('Invalid credentials');
            }

            setSuccess(true);
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleView = () => {
        setShowSignUp(!showSignUp);
    };

    const handleSignUpSuccess = () => {
        toggleView(); 
    };

    if (success) { // If login is successful, render the App component
        return <App />;
    }

    if (showSignUp) {
        return (
            <div className='login-container'>
                <SignUp onSuccess={handleSignUpSuccess} />
                <button onClick={toggleView}>Login</button>
            </div>
        );
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className='login-form'>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
                {error && <div className='error-message'>{error}</div>}
                {success && <div className='success-message'>Login successful!</div>}
            </form>
            <button onClick={toggleView}>Sign Up</button>
        </div>
    );
}

export default Login;
