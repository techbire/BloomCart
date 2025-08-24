import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import './ErrorMessage.css';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry = null,
  showRetry = true 
}) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <FaExclamationTriangle className="error-icon" />
        <h3 className="error-title">Oops!</h3>
        <p className="error-message">{message}</p>
        {showRetry && onRetry && (
          <button className="retry-btn" onClick={onRetry}>
            <FaRedo className="retry-icon" />
            Wake Up Backend
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
