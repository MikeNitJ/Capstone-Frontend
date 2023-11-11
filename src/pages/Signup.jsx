// Signup.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();


  const handleSignup = async () => {
    try {
      // Make an API request to your login endpoint
      // Send username and password in the request
      const response = await fetch("localhost:7000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, name }),
      });

      if (response.ok) {
        // Login successful, redirect to the dashboard or another page
        const token = await response.json()
        localStorage.setItem('accessToken', token.auth_token);
        console.log(token);
        navigate('/login');
      } else {
        // Handle login failure, display error message
        // You can set error state and display a message to the user
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
