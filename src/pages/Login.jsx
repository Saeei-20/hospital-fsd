// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userType, setUserType] = useState('manager');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials in the request
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div className="login-container">
      {/* <div className="user-type-buttons">
        <button className={userType === 'manager' ? 'active' : ''} onClick={() => handleUserTypeChange('manager')}>Manager</button>
        <button className={userType === 'doctor' ? 'active' : ''} onClick={() => handleUserTypeChange('doctor')}>Doctor</button>
        <button className={userType === 'pharmacy' ? 'active' : ''} onClick={() => handleUserTypeChange('pharmacy')}>Pharmacy</button>
      </div> */}

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Submit</button>

        <p className="error-message">{errorMessage}</p>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
