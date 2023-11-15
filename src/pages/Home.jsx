import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

const Home = () => {
  const orderId = '65501c2f830b1861f8cfba79';
  return (
    <div><Navbar/>
        Welcome to Thaicuisine restaurant
        <Link to={`/order/${orderId}`}>Go to Order</Link>
        </div>
  )
}

export default Home