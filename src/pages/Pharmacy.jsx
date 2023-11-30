// Pharmacy.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pharmacy.css';

const Pharmacy = () => {
  const [medicineList, setMedicineList] = useState([
    { name: 'Medicine A', quantity: 10, availability: 'Y', cost: 50 },
    { name: 'Medicine B', quantity: 5, availability: 'N', cost: 30 },
  ]);

  const [cart, setCart] = useState([]);

  const handleIncreaseQuantity = (index) => {
    setMedicineList((prevMedicineList) => {
      const updatedList = [...prevMedicineList];
      updatedList[index] = { ...updatedList[index], quantity: updatedList[index].quantity + 1 };
      return updatedList;
    });
  };

  const handleDecreaseQuantity = (index) => {
    if (medicineList[index].quantity > 0) {
      setMedicineList((prevMedicineList) => {
        const updatedList = [...prevMedicineList];
        updatedList[index] = { ...updatedList[index], quantity: updatedList[index].quantity - 1 };
        return updatedList;
      });

      setCart((prevCart) => [...prevCart, { ...medicineList[index], id: Date.now() }]);
    }
  };

  return (
    <div className="pharmacy-container">
      <h2>PHARMACY</h2>

      <table className="medicine-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Availability</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicineList.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.name}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.availability}</td>
              <td>{medicine.cost}</td>
              <td>
                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to={{ pathname: '/addtocart', state: { cart } }}>
        <button className="go-to-cart-button">Go to Cart</button>
      </Link>
    </div>
  );
};

export default Pharmacy;
