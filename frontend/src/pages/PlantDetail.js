import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaArrowLeft, FaStar, FaLeaf } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './PlantDetail.css';

const PlantDetail = ({ onAddToCart, onBuyNow }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        console.log('Fetching plant with ID:', id);
        const response = await fetch(`http://localhost:5000/api/plants/${id}`);
        if (!response.ok) {
          throw new Error('Plant not found');
        }
        const result = await response.json();
        console.log('API response:', result);
        // Handle the API response structure
        const plantData = result.success ? result.data : result;
        setPlant(plantData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching plant:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchPlant();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (plant) {
      const stockAmount = plant.stock || plant.stock_quantity || 0;
      if (stockAmount > 0) {
        console.log('Adding to cart from PlantDetail:', { ...plant, quantity });
        onAddToCart({ ...plant, quantity });
        toast.success(`${plant.name} added to cart!`);
      } else {
        toast.error('This plant is out of stock');
      }
    }
  };

  const handleBuyNow = () => {
    if (plant) {
      const stockAmount = plant.stock || plant.stock_quantity || 0;
      if (stockAmount > 0) {
        console.log('Buy now from PlantDetail:', [{ ...plant, quantity }]);
        onBuyNow([{ ...plant, quantity }]);
      } else {
        toast.error('This plant is out of stock');
      }
    }
  };

  const handleImageError = async () => {
    console.log('Image failed to load, attempting to fetch new image for:', plant?.name);
    setImageLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/images/plant/${plant._id}`);
      const result = await response.json();
      
      if (result.success && result.imageUrl) {
        console.log('Got new image URL:', result.imageUrl);
        setPlant(prev => ({ ...prev, image: result.imageUrl }));
        setImageError(false);
      } else {
        console.log('No alternative image found, using fallback');
        setImageError(true);
      }
    } catch (error) {
      console.error('Failed to fetch alternative image:', error);
      setImageError(true);
    } finally {
      setImageLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!plant) return <ErrorMessage message="Plant not found" />;

  return (
    <div className="plant-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      
      <div className="plant-detail-content">
        <div className="plant-image-section">
          {imageLoading && (
            <div className="image-loading">
              <LoadingSpinner size="small" message="Loading image..." />
            </div>
          )}
          {imageError ? (
            <div className="image-fallback">
              <FaLeaf className="fallback-icon" />
              <p>Image not available</p>
              <button 
                className="retry-image-btn"
                onClick={handleImageError}
              >
                Try Again
              </button>
            </div>
          ) : (
            <img 
              src={plant.image} 
              alt={plant.name} 
              className={`plant-detail-image ${imageLoading ? 'loading' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
          )}
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
          >
            <FaHeart />
          </button>
        </div>
        
        <div className="plant-info-section">
          <div className="plant-header">
            <h1>{plant.name}</h1>
            <div className="plant-category">
              <span>{plant.category}</span>
            </div>
          </div>
          
          <div className="plant-rating">
            {[...Array(5)].map((_, index) => (
              <FaStar 
                key={index} 
                className={index < 4 ? 'star active' : 'star'} 
              />
            ))}
            <span className="rating-text">(4.0) 23 reviews</span>
          </div>
          
          <div className="plant-price">
            <span className="current-price">₹{plant.price}</span>
            <span className="original-price">₹{Math.round(plant.price * 1.2)}</span>
            <span className="discount">17% OFF</span>
          </div>
          
          <div className="plant-description">
            <h3>Description</h3>
            <p>{plant.description}</p>
          </div>
          
          <div className="plant-care-info">
            <h3>Care Instructions</h3>
            <div className="care-grid">
              <div className="care-item">
                <strong>Light:</strong> {plant.light || 'Bright indirect light'}
              </div>
              <div className="care-item">
                <strong>Water:</strong> {plant.watering || 'Once a week'}
              </div>
              <div className="care-item">
                <strong>Humidity:</strong> {plant.humidity || 'Medium'}
              </div>
              <div className="care-item">
                <strong>Temperature:</strong> {plant.temperature || '18-24°C'}
              </div>
            </div>
          </div>
          
          <div className="stock-info">
            <span className={`stock-status ${(plant.stock || plant.stock_quantity || 0) > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {(plant.stock || plant.stock_quantity || 0) > 0 ? `${plant.stock || plant.stock_quantity} in stock` : 'Out of stock'}
            </span>
          </div>
          
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                id="quantity"
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={plant.stock || plant.stock_quantity || 1}
              />
              <button 
                onClick={() => setQuantity(Math.min((plant.stock || plant.stock_quantity || 1), quantity + 1))}
                disabled={quantity >= (plant.stock || plant.stock_quantity || 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={(plant.stock || plant.stock_quantity || 0) === 0}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button 
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={(plant.stock || plant.stock_quantity || 0) === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;