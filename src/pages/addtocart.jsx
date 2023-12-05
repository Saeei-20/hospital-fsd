 // AddToCart.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const AddToCart = () => {
  const location = useLocation();
  const cart = location?.state;

  return (
    <div className="add-to-cart-container">
      <h2>Shopping Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.cost * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddToCart;
 


