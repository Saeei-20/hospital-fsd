// AddToCart.jsx
import React from 'react';

const AddToCart = (props) => {
  const { location } = props;
  const { state } = location;
  const cart = state && state.cart ? state.cart : [];

  return (
    <div>
      <h2>Add to Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.name}</td>
              <td>{medicine.cost}</td>
              <td>{medicine.quantity}</td>
              <td>
                <button onClick={() => alert('Remove from Cart')}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Total Cost: {cart.reduce((total, medicine) => total + medicine.cost * medicine.quantity, 0)}</p>
      </div>

      <button onClick={() => alert('Receipt Printed')}>Print Receipt</button>
    </div>
  );
};

export default AddToCart;
