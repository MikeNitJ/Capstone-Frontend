
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const FoodShow = () => {
    
const { id } = useParams();//to use id from url 
const [foodShow, setFoodShow] = useState({});
const URL = "http://localhost:7000"; // Add "http://" before the URL
const token = localStorage.getItem('accessToken');
const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };

  const foodShowLoader = async () => {
    try {
      const response = await fetch(URL + `/food/${id}`, {
        headers: commonHeaders,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const foodShowData = await response.json();
      return foodShowData;
    } catch (error) {
      console.error('Error fetching food data:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };

  useEffect(() => {
    // Call the foodIndexLoader function when the component mounts
    foodShowLoader()
      .then((data) => {
        setFoodShow(data);
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2>Food Details</h2>
      <p>Name: {foodShow.name}</p>
      <p>ID: {foodShow._id}</p>
      <p>Type: {foodShow.type}</p>
      <p>Price: {foodShow.price}</p>
      <img src={foodShow.image} alt={foodShow.name} style={{
                maxWidth: '400px', 
                maxHeight: '400px', 
              }} />
    </div>
  );
};

export default FoodShow;
