// Pharmacy.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pharmacy.css';

const Pharmacy = () => {
  const [medicineList, setMedicineList] = useState([
    { name: 'Medicine A', quantity: 10, availability: 'Y', cost: 50, action: 0 },
    { name: 'Medicine B', quantity: 5, availability: 'N', cost: 30, action: 0 },
  ]);

  const [cart, setCart] = useState([]);

  const handleQuantityChange = (index, change) => {
    setMedicineList((prevMedicineList) => {
      const updatedList = [...prevMedicineList];
      const newAction = updatedList[index].action + change;

      if (newAction >= 0 && updatedList[index].quantity - change >= 0) {
        updatedList[index] = { ...updatedList[index], action: newAction, quantity: updatedList[index].quantity - change };
      }

      return updatedList;
    });
  };

  const handleAddToCart = (index) => {
    if (medicineList[index].action > 0) {
      setCart((prevCart) => [
        ...prevCart,
        { ...medicineList[index], quantity: medicineList[index].action, id: Date.now() },
      ]);
      handleQuantityChange(index, medicineList[index].action);
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
                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                {medicine.action}
                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                <button onClick={() => handleAddToCart(index)}>Add to Cart</button>
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
