import React from 'react';
import './Profile.css'; // Import profile styles

const Profile = () => {
  // Replace with actual user data
  const userName = 'Stuti Gupta';
  const userMobile = '123-456-7890';

  return (
    <div className="profile">
      <h2>Hello, {userName}!</h2>
      <p>Mobile: {userMobile}</p>
      <ul>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/wishlist">Wishlist</a></li>
        <li><a href="/gift-cards">Gift Cards</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
        <li><a href="/coupons">Coupons</a></li>
        <li><a href="/address">Address</a></li>
        <li><a href="/edit-profile">Edit Profile</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  );
};

export default Profile;
