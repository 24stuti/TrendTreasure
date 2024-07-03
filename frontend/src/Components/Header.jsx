import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import your header styles
import Profile from './Profile';

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to cart page
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
          <div className="header-icon" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </div>
          <div className="header-icon profile-dropdown">
            <FontAwesomeIcon icon={faUserCircle} /> Profile
            <div className="profile-dropdown-content">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
