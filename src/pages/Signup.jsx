// Signup.jsx
import React, { useState } from 'react';
import './Signup.css';
import{ Link , useNavigate} from 'react-router-dom'
const Signup = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example validation (you may want to add more robust validation)
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!name || !gender || !dob || !contactNumber || !email || !username || !password || !confirmPassword) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          gender,
          dob,
          contactNumber,
          email,
          username,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
        setErrorMessage('');

        alert('Data submitted successfully!');
        navigate('/Login')

        // Clear form fields
        setName('');
        setGender('');
        setDob('');
        setContactNumber('');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Error submitting the form');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setErrorMessage('Internal Server Error');
    }

    setErrorMessage('');
  };


  return (
    <div className="signup-container">
   
      <h2>Sign up for Doctor/ Pharmacist</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="gender">Gender:</label>
        <input id="gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
        
        

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />

        <label htmlFor="contactNumber">Contact Number:</label>
        <input type="tel" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

        <label htmlFor="email">Email ID:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />


        <label htmlFor="password">Enter Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button type="submit">Submit</button>

        <p className="error-message">{errorMessage}</p>
      </form>
    </div>
  );
};

export default Signup;
