// Signup.jsx
import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your signup logic here
    // You can use the form data to send to your server or handle signup in your preferred way

    // Example validation (you may want to add more robust validation)
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!name || !gender || !dob || !contactNumber || !email || !username || !photo || !idProof || !password || !confirmPassword) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    // Additional validation and signup logic...

    // If validation is successful, you can proceed with signup
    setErrorMessage(''); // Clear error message on successful submission
  };

  return (
    <div className="signup-container">
      {/* <h2>Sign Up</h2> */}
      <h2>Sign up for Doctor</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />

        <label htmlFor="contactNumber">Contact Number:</label>
        <input type="tel" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

        <label htmlFor="email">Email ID:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="photo">Upload Photo:</label>
        <input type="file" id="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

        <label htmlFor="idProof">Upload ID Proof:</label>
        <input type="file" id="idProof" accept="image/*" onChange={(e) => setIdProof(e.target.files[0])} />

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
