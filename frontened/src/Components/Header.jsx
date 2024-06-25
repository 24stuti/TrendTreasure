import React, { useState } from 'react';
import Login from './login'; // Import your Login component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import your header styles

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src="/images/logo.png" alt="TrendTreasure Logo" className='logo-image' />
        </div>
        <nav className="header-bottom">
          <ul>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/electronics">Electronics</a></li>
            <li><a href="/footwear">Footwear</a></li>
            <li><a href="/beauty">Beauty</a></li>
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search for products, brands and more" />
          <button type="button">Search</button>
        </div>
        <div className="header-icons">
          <div className="header-icon" onClick={handleLoginClick}>
            <FontAwesomeIcon icon={faUser} /> Login
          </div>
          <div className="header-icon">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </div>
          <div className="header-icon profile-dropdown">
            <FontAwesomeIcon icon={faUserCircle} /> Profile
            <div className="profile-dropdown-content">
              <a href="/profile">Hello, Stuti Gupta</a>
              <a href="/orders">Orders</a>
              <a href="/wishlist">Wishlist</a>
              <a href="/gift-cards">Gift Cards</a>
              <a href="/contact-us">Contact Us</a>
              <a href="/coupons">Coupons</a>
              <a href="/address">Address</a>
              <a href="/edit-profile">Edit Profile</a>
              <a href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render Login component */}
      {showLogin && <Login />}
    </header>
  );
};

export default Header;
