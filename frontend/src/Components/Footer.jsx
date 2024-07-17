import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="contact-us">Contact Us</a></li>
            <li><a href="faqs">FAQs</a></li>
            <li><a href="returns">Returns</a></li>
            <li><a href="track-order">Track Order</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Important Links</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TrendTreasure. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
