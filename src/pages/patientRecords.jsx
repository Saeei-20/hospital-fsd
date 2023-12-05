// PatientRecords.jsx
import React, { useEffect, useState } from 'react';
import './patientRecords.css';

const patientRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
    
  const [patientRecords, setPatientRecords] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/getUsers');
        if (response.ok) {
          const data = await response.json();
          setPatientRecords(data);
        } else {
          console.log('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      
      } finally {
       
      }
    };

    fetchUsers();
  }, []); 


  const handleSearch = () => {
   

    const result = patientRecords.filter(record => record.id.includes(searchTerm));
    setPatientRecords(result);
  };

  const handleFilter = () => {


    // Filter functionality filters records that include the filter term in symptoms
    const result = patientRecords.filter(record => record.symptoms.toLowerCase().includes(filterTerm.toLowerCase()));
    setPatientRecords(result);
  };

  return (
    <div className="patient-records-container">
      <div className="header">
        <button className="search-button" onClick={handleSearch}>SEARCH</button>
        <button className="filter-button" onClick={handleFilter}>FILTER</button>
      </div>

      <table className="patient-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Symptoms</th>
            <th>Past Medical Issues</th>
            <th>Contact No</th>
            {/* <th>Bill Amount</th> */}
          </tr>
        </thead>
        <tbody>
          {patientRecords.map(record => (
            <tr key={record._id}>
              <td>{record._id.slice(-4)}</td>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td>{record.bloodGroup}</td>
              <td>{record.symptoms}</td>
              <td>{record.pastMedicalIssues}</td>
              <td>{record.contactNumber}</td>
              {/* <td>{record.billAmount}</td> */}
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default patientRecords;
