
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Cart = () => {
    
const { id } = useParams();//to use id from url 
const [cartShow, setCartShow] = useState({});
const URL = "http://localhost:7000"; // Add "http://" before the URL
const token = localStorage.getItem('accessToken');
const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };

  const cartShowLoader = async () => {
    try {
      const response = await fetch(URL + `/order/${id}`, {
        headers: commonHeaders,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const cartShowData = await response.json();
      return cartShowData;
    } catch (error) {
      console.error('Error fetching cart data:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };

  useEffect(() => {
    // Call the cartIndexLoader function when the component mounts
    cartShowLoader()
      .then((data) => {
        setCartShow(data);
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2>Cart Details</h2>
      <p>Name: {cartShow.name}</p>
      <p>ID: {cartShow._id}</p>
      <p>Type: {cartShow.total}</p>
      <p>Price: {cartShow.price}</p>
      <img src={cartShow.image} alt={cartShow.name} style={{
                maxWidth: '400px', 
                maxHeight: '400px', 
              }} />
    </div>
  );
};

export default Cart;
