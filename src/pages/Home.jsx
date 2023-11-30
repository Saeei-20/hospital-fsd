// Home.jsx
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Smart Hospital Management System</h2>
      <p>
        Smart Hospital is committed to providing high-quality healthcare services to our community.
        Our team of dedicated professionals is here to ensure the well-being of our patients.
      </p>

      <div className="functionality-boxes">
        <div className="functionality-box">
          <h3>Qualified Doctors</h3>
          <p>Our hospital is staffed with experienced and highly qualified medical professionals dedicated to providing the best care for our patients.</p>
        </div>

        <div className="functionality-box">
          <h3>Emergency Care</h3>
          <p>We offer 24/7 emergency care services, ensuring that you receive immediate and compassionate medical attention in times of need.</p>
        </div>

        <div className="functionality-box">
          <h3>Best Treatments</h3>
          <p>Our hospital is equipped with state-of-the-art technology and facilities to provide the best and most advanced medical treatments for various conditions.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
