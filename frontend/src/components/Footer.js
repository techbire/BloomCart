import React from 'react';
import { FaLeaf, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaLeaf className="footer-logo-icon" />
              <span className="footer-logo-text">BloomCart</span>
            </div>
            <p className="footer-description">
              Your one-stop destination for beautiful, healthy plants that bring nature to your home.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Browse Plants</Link></li>
              <li><Link to="/add-plant">Add Plant</Link></li>
              <li><a href="https://www.linkedin.com/in/techbire/" target="_blank" rel="noopener noreferrer">About Us</a></li>
              <li><Link to={`/?category=${encodeURIComponent('Favorites')}`}>Favorite Collection</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to={`/?category=${encodeURIComponent('Indoor')}`}>Indoor Plants</Link></li>
              <li><Link to={`/?category=${encodeURIComponent('Outdoor')}`}>Outdoor Plants</Link></li>
              <li><Link to={`/?category=${encodeURIComponent('Succulent')}`}>Succulents</Link></li>
              <li><Link to={`/?category=${encodeURIComponent('Air Purifying')}`}>Air Purifying</Link></li>
              <li><Link to={`/?category=${encodeURIComponent('Favorites')}`}>Favorite Collection</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-info">
              <p>📧 <a href="mailto:anshhtechnical@gmail.com">anshhtechnical@gmail.com</a></p>
             </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            Made with <FaHeart className="heart-icon" /> for plant lovers everywhere
          </p>
          <p>&copy; 2025 BloomCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
