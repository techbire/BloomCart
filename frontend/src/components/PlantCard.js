import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaTag, FaEye, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import { imageAPI } from '../utils/imageAPI';
import './PlantCard.css';

const PlantCard = ({ plant, onAddToCart }) => {
  const navigate = useNavigate();
  const [plantImage, setPlantImage] = useState(plant.image);
  const [imageLoading, setImageLoading] = useState(false);

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

  // Check if image is placeholder and fetch from Google Images API
  useEffect(() => {
    const fetchPlantImage = async () => {
      if (!image || image.includes('placeholder') || image.includes('via.placeholder')) {
        setImageLoading(true);
        try {
          const googleImage = await imageAPI.getPlantImage(name);
          if (googleImage) {
            setPlantImage(googleImage);
          }
        } catch (error) {
          console.error('Error fetching plant image:', error);
        } finally {
          setImageLoading(false);
        }
      }
    };

    fetchPlantImage();
  }, [name, image]);

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
        {imageLoading && (
          <div className="image-loading-overlay">
            <LoadingSpinner size="small" showMessage={false} />
          </div>
        )}
        <img 
          src={plantImage || 'https://via.placeholder.com/300x300?text=Plant'} 
          alt={name}
          className="plant-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Plant';
          }}
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
