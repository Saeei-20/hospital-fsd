// Pharmacy.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Pharmacy.css';

const Pharmacy = () => {
  const [medicineList, setMedicineList] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/medicines');
        const data = await response.json();
        // Sort the data by ID before setting the state
        const sortedData = data.sort((a, b) => a.id - b.id);
        setMedicineList(sortedData);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  const handleChangeQuantity = (value, id) => {
    setMedicineList((prevMedicineList) => {
      return prevMedicineList.map((medicine) => {
        if (medicine.id === id) {
          return { ...medicine, quantity: value };
        }
        return medicine;
      });
    });
  };

  // Function to handle "Add to Cart" button click
const handleAddToCart = async (id, quantity) => {
  try {
    const selectedMedicine = medicineList.find((medicine) => medicine.id === id);

    // Calculate the total price by multiplying quantity with price
    const totalPrice = selectedMedicine.price * (quantity || 1);

    // Make a POST request to your server to add the item to the cart
    const response = await fetch('http://localhost:4000/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: selectedMedicine.name,
        price: selectedMedicine.price,
        quantity: quantity || 1, // Default to 1 if quantity is not set
        totalPrice, // Include the total price in the request
      }),
    });

    const data = await response.json();
    console.log(data.message); // Log the server response

    // You may also want to update your UI to reflect that the item has been added to the cart
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

  

  return (
    <div className="pharmacy-container">
      <h2>PHARMACY</h2>

      <table className="medicine-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Manufacturer Name</th>
            <th>Composition</th>
            <th>Pack Size</th>
            <th>Purchase</th>

          </tr>
        </thead>
        <tbody>
          {medicineList.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.id}</td>
              <td>{medicine.name}</td>
              <td>{medicine.price}</td>
              <td>{medicine.manufacturer_name}</td>
              <td>{medicine.short_composition1}</td>
              <td>{medicine.pack_size_label}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  onChange={(event) => handleChangeQuantity(event.target.value, medicine.id)}
                  placeholder="Quantity"
                />
                <button onClick={() => handleAddToCart(medicine.id, medicine.quantity)}>Add to Cart</button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Rest of your component code */}
    </div>
  );
};

export default Pharmacy;
