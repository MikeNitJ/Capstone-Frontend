import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Order = () => {
  const [foodList, setFoodList] = useState([]);
  const URL = "http://localhost:7000"; // Add "http://" before the URL
  const token = localStorage.getItem('accessToken');
  const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };

  // Define the foodIndexLoader function outside of the component
  const foodIndexLoader = async () => {
    try {
      const response = await fetch(URL + "/food", {
        headers: commonHeaders,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const foodListData = await response.json();
      return foodListData;
    } catch (error) {
      console.error('Error fetching food data:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };

  useEffect(() => {
    // Call the foodIndexLoader function when the component mounts
    foodIndexLoader()
      .then((data) => {
        setFoodList(data);
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  
    return (
        <div>
          <h2>Food Items</h2>
          <ul>
            {foodList.map((food) => (
              <li>
                <Link to ={`/food/${food._id}`}>{food.name}</Link>
                <br />
                {food._id}
                <br />
                {food.type}
                <br />
                {food.price}
                <br />
                <img src={food.image} style={{
                maxWidth: '200px', 
                maxHeight: '200px', 
              }} />
              <button>add to cart</button>
              </li>
            ))}
          </ul>
        </div>
      );
  
};

export default Order;
