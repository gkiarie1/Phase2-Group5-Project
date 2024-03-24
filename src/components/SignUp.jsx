import React, { useState, useEffect } from 'react';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // useEffect to fetch security questions
    useEffect(() => {
        fetchSecurityQuestions();
    }, []);

    const fetchSecurityQuestions = async () => {
        try {
            const response = await fetch('https://json-server-users-task-manager.onrender.com/users');
            if (!response.ok) {
                throw new Error('Failed to fetch security questions');
            }
            const data = await response.json();
            const questions = data.reduce((acc, user) => {
                if (user.security_question && !acc.includes(user.security_question)) {
                    acc.push(user.security_question);
                }
                return acc;
            }, []);
            setSecurityQuestions(questions);
        } catch (error) {
            console.error('Error fetching security questions:', error.message);
            setError('Failed to fetch security questions');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Basic validation
        if (!email || !password || !confirmPassword || !securityQuestion || !securityAnswer) {
            setError('All fields are required');
            return;
        }

        // Password validation
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!passwordPattern.test(password)) {
            setError('Password must contain at least one uppercase letter, one special character, and be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        // Form data
        const formData = {
            email,
            password,
            securityQuestion,
            securityAnswer
        };

        // Send form data to the server
        try {
            const response = await fetch('https://json-server-users-task-manager.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }
            setSuccessMessage('Sign up successful');
            // Clear form fields
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setSecurityQuestion('');
            setSecurityAnswer('');
        } catch (error) {
            console.error('Error signing up:', error.message);
            setError('Failed to sign up');
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2>Sign Up</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label>Security Question:</label>
                        <select value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)} required>
                            <option value="">Select Security Question</option>
                            {securityQuestions.map(question => (
                                <option key={question} value={question}>{question}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Security Answer:</label>
                        <input type="text" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
