import React, { useEffect, useState } from 'react';
import './Profile.css'; // Import profile styles

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });

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
    }
  }, []);
  

  return (
    <div className="profile">
      <h2>Hello, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <ul>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/wishlist">Wishlist</a></li>
        <li><a href="/gift-cards">Gift Cards</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
        <li><a href="/coupons">Coupons</a></li>
        <li><a href="/address">Address</a></li>
        <li><a href="/edit-profile">Edit Profile</a></li>
        <li><a href="/" onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
        }}>Logout</a></li>
      </ul>
    </div>
  );
};

export default Profile;
