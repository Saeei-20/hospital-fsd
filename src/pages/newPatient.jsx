// NewPatient.jsx
import React, { useState } from 'react';
import './NewPatient.css';

const NewPatient = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [contactNumber, setContactNumber] = useState();
  const [address, setAddress] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [pastMedicalIssues, setPastMedicalIssues] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic form validations
    if (!name || !age || !gender || !weight || !bloodGroup || !contactNumber || !address || !symptoms || !pastMedicalIssues) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    // Additional validations
    if (!/^\d+$/.test(age) || age <= 0) {
      setErrorMessage('Please enter a valid age');
      return;
    }

    if (!/^\d+$/.test(weight) || weight <= 0) {
      setErrorMessage('Please enter a valid weight');
      return;
    }

    // if (!/^[6-9]\d{9}$/.test(contactNumber)) {
    //   setErrorMessage('Please enter a valid contact number');
    //   return;
    // }

    if (bloodGroup === '') {
      setErrorMessage('Please select a blood group');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/user/addUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name,
              age,
              gender,
              weight,
              bloodGroup,
              contactNumber,
              address,
              symptoms,
              pastMedicalIssues,
          }),
      });
      if (response?.ok) {
          setErrorMessage(''); 
          alert("Data submitted succesfully")

          setName('');
          setAge('');
          setGender('');
          setWeight('');
          setBloodGroup('');
          setContactNumber();
          setAddress('');
          setSymptoms('');
          setPastMedicalIssues('');
          

        } else {
          const data = await response.json();
          setErrorMessage(data.message || 'Error submitting the form');
      }
  } catch (error) {
      console.error('Error submitting the form:', error);
      setErrorMessage('Internal Server Error');
  }

    setErrorMessage(''); // Clear error message on successful submission
  };

  return (
    <div className="new-patient-container">
      <h2>Add New Patient</h2>

      <form className="new-patient-form" onSubmit={handleSubmit}>
        {/* Form fields */}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />

        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="weight">Weight:</label>
        <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />

        {/* <label htmlFor="bloodGroup">Blood Group:</label>
        <input type="text" id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} /> */}

        <label htmlFor="bloodGroup">Blood Group:</label>
        <select id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label htmlFor="contactNumber">Contact Number:</label>
        <input type="number" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

        <label htmlFor="address">Address:</label>
        <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label htmlFor="symptoms">Symptoms:</label>
        <textarea id="symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />

        <label htmlFor="pastMedicalIssues">Any Past Medical Issues:</label>
        <textarea id="pastMedicalIssues" value={pastMedicalIssues} onChange={(e) => setPastMedicalIssues(e.target.value)} />

        <button type="submit">Submit</button>

        <p className="error-message">{errorMessage}</p>
      </form>
    </div>
  );
};

export default NewPatient;
