import React, { useState } from 'react';
import Login from './login'; // Import your Login component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import your header styles
import Profile from './Profile';
import Cart from './Cart'; // Import your Cart component

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
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
              <Profile/>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render Login component */}
      {showLogin && <Login />}

      {/* Conditionally render Cart component */}
      {showCart && <Cart />}
    </header>
  );
};

export default Header;
