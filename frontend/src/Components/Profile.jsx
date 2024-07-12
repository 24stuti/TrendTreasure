import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          setUser({ name: userData.name, email: userData.email });
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleOrdersClick = () => {
    navigate('/order/:id'); // Navigate to the OrderList component
  };

  return (
    <div className="profile-container">
      <h1>Hello, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <ul>
        <li><button onClick={handleOrdersClick}>Orders</button></li>
        <li>Wishlist</li>
        <li>Gift Cards</li>
        <li>Contact Us</li>
        <li>Coupons</li>
        <li>Address</li>
        <li>Edit Profile</li>
        <li>
          <button onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
          }}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;