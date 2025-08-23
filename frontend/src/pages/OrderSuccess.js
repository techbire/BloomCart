import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <div className="success-content">
        <FaCheckCircle className="success-icon" />
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your plants will be delivered soon!</p>
        
        <div className="success-actions">
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            <FaShoppingBag /> Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
