import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  message = 'Loading plants...', 
  size = 'default', // 'small', 'default', 'large', 'inline'
  showMessage = true,
  className = '' 
}) => {
  return (
    <div className={`loading-container ${className}`}>
      <div className={`loading-spinner ${size}`}>
        <div className="spinner-leaf">🌱</div>
      </div>
      {showMessage && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
