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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    // Additional validation logic based on your requirements

    // If validation is successful, you can proceed with authentication or other actions
  };

  return (
    <div className="login-container">
      <div className="user-type-buttons">
        {/* <button className={userType === 'manager' ? 'active' : ''} onClick={() => handleUserTypeChange('manager')}>Manager</button> */}
        <button className={userType === 'doctor' ? 'active' : ''} onClick={() => handleUserTypeChange('doctor')}>Doctor</button>
        <button className={userType === 'pharmacy' ? 'active' : ''} onClick={() => handleUserTypeChange('pharmacy')}>Pharmacy</button>
      </div>

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
