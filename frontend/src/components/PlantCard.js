import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaTag, FaEye, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './PlantCard.css';

const PlantCard = ({ plant, onAddToCart }) => {
  const navigate = useNavigate();

  const {
    _id,
    name,
    price,
    category,
    categories,
    stock,
    stock_quantity,
    description,
    image
  } = plant;

  const isInStock = stock > 0 || stock_quantity > 0;
  const stockCount = stock || stock_quantity || 0;
  const plantCategory = category || (categories && categories[0]) || 'General';

  const handleViewDetails = () => {
    navigate(`/plant/${_id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isInStock && onAddToCart) {
      const plantToAdd = { ...plant, quantity: 1 };
      console.log('PlantCard - Adding to cart:', plantToAdd);
      onAddToCart(plantToAdd);
      toast.success(`${name} added to cart!`);
    } else {
      toast.error('This plant is out of stock');
    }
  };

  return (
    <div className="plant-card" onClick={handleViewDetails}>
      <div className="plant-image-container">
        <img 
          src={image} 
          alt={name}
          className="plant-image"
        />
        <div className={`availability-badge ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
      
      <div className="plant-info">
        <h3 className="plant-name">{name}</h3>
        
        <div className="plant-price">
          <span className="current-price">
            <FaRupeeSign className="rupee-icon" />
            {price}
          </span>
          <span className="original-price">₹{Math.round(price * 1.2)}</span>
          <span className="discount">17% OFF</span>
        </div>
        
        <div className="plant-categories">
          <span className="category-tag">
            <FaTag className="tag-icon" />
            {plantCategory}
          </span>
        </div>
        
        {description && (
          <p className="plant-description">
            {description.length > 80 
              ? `${description.substring(0, 80)}...` 
              : description
            }
          </p>
        )}
        
        <div className="plant-footer">
          <div className="stock-info">
            {isInStock && (
              <span className="stock-count">
                {stockCount} available
              </span>
            )}
          </div>
          
          <div className="plant-actions">
            <button 
              className="view-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <FaEye /> View
            </button>
            
            <button 
              className={`add-to-cart-btn ${!isInStock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!isInStock}
            >
              <FaShoppingCart />
              {isInStock ? 'Add' : 'Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
