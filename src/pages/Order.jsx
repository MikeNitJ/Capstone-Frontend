import React, { useEffect, useState } from 'react';
import { Link, useParams, useLoaderData } from 'react-router-dom';
import { foodIndexLoader } from '../loader';

const Order = () => {
  const {foodListData, orderListData } = useLoaderData()
  const id = useParams()
  const [foodList, setFoodList] = useState([]);
  const [userId, setUserId] = useState(""); 
  const URL = "http://localhost:7000"; // Add "http://" before the URL
  const token = localStorage.getItem('accessToken');
  const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  
  // foodIndexLoader()
  console.log(foodListData,orderListData,id);
  // Define the foodIndexLoader function outside of the component
  // const foodIndexLoader = async () => {
  //   try {
  //     const response = await fetch(URL + "/food", {
  //       headers: commonHeaders,
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Request failed with status: ${response.status}`);
  //     }

  //     const foodListData = await response.json();
  //     return foodListData;
  //   } catch (error) {
  //     console.error('Error fetching food data:', error);
  //     throw error; // Rethrow the error for further handling if needed
  //   }
  // };

  const orderShowLoader = async (id) => {
    try {
      const response = await fetch(URL + `/order/${id}`, {
        headers: commonHeaders,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const orderData = await response.json();
      return orderData;
    } catch (error) {
      console.error('Error fetching food data:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };


  const orderCreateAction = async (selectedFoods) => {
    try {
      // Fetch the food data based on selected food IDs
      const response = await fetch(URL + "/order", {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify({ foods: selectedFoods }),
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const orderData = await response.json();
      return orderData;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };

  const createCart = async () => {
    try {
      const response = await fetch(URL + "/order/createcart", {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify({ userId, foods: [] }), // Include the userId in the request body
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const orderData = await response.json();
      // Handle the created order as needed (e.g., store the order ID)
    } catch (error) {
      console.error('Error creating cart:', error);
      // Handle the error as needed
    }
  };

  const addToCart = async (foodId, id) => {
    try {
      const response = await fetch(URL + `/order/${id}`, { 
        // trying to use id from line 5
      // const response = await fetch(URL + `/order/65501ca4830b1861f8cfba7f`, {
        method: "PUT",
        headers: commonHeaders,
        body: JSON.stringify({  foods: [foodId] }), // Include the food ID in the request body
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      // Handle the response as needed (e.g., update the UI)
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle errors as needed
    }
  };



  // useEffect(() => {
  //   // Call the foodIndexLoader function when the component mounts
  //   foodIndexLoader()
  //     .then((data) => {
  //       setFoodList(data);
  //     })
  //     .catch((error) => {
  //       // Handle the error, e.g., show an error message
  //     });
  // }, []); // Empty dependency array means this effect runs once when the component mounts

  
    return (
        <div>
          <button onClick={createCart}>Create Cart</button>
          <h2>Show Order</h2>
          <p></p>
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
            <button onClick={() => addToCart(food._id,id)}>Add to Cart</button>
              </li>
            ))}
          </ul>
          {/* <Link to = {`/cart/${order._id}`}>To Your CART</Link> */}
          <button>to cart that send to Cart page delete or preview</button>
        </div>
      );
  
};

export default Order;
