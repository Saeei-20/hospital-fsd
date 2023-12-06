import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the server
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/cartItems');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteItem = async (_Id) => {
    try {
      // Make a DELETE request to your server to delete the item
      await fetch(`http://localhost:4000/cartItems/${_Id}`, {
        method: 'DELETE',
      });

      // Update the cartItems state to reflect the changes
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== _Id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                {isNaN(item.price) || isNaN(item.quantity)
                  ? 'Invalid Cost'
                  : (item.price * item.quantity).toFixed(2)}
              </td>
              <td>
                <button onClick={() => handleDeleteItem(item._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
