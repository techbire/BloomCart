import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaPlus, FaShoppingCart, FaStore } from 'react-icons/fa';
import './Header.css';

const Header = ({ cartItemCount, onCartClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);
  
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <FaLeaf className="logo-icon" />
            <span className="logo-text">BloomCart</span>
          </Link>
          
          {/* Hamburger button for mobile */}
          <button
            className={`hamburger-btn ${mobileOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMobile}>
              <FaStore className="btn-icon" />
              Browse Plants
            </Link>
            <Link to="/add-plant" className="nav-link" onClick={closeMobile}>
              <FaPlus className="btn-icon" />
              Add Plant
            </Link>
            <button className="cart-btn" onClick={() => { onCartClick(); closeMobile(); }}>
              <FaShoppingCart />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
