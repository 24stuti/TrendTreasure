import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import Profile from './Profile';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo" onClick={handleLogoClick}>
          <img src="/images/logo.png" alt="TrendTreasure Logo" className="logo-image" />
        </div>
        {/* {<nav className="header-bottom">
          <ul>
            <li><Link to="/category/Men">Men</Link></li>
            <li><Link to="/category/Women">Women</Link></li>
            <li><Link to="/category/Kids">Kids</Link></li>
            <li><Link to="/category/Electronics">Electronics</Link></li>
            <li><Link to="/category/Footwear">Footwear</Link></li>
            <li><Link to="/category/Beauty">Beauty</Link></li>
            <li><Link to="/category/Jewellery">Jewellery</Link></li>
          </ul>
        </nav>} */}
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
