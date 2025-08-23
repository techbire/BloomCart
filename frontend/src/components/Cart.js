import React from 'react';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import './Cart.css';

const Cart = ({ cartItems, updateQuantity, removeFromCart, onProceedToCheckout }) => {
  console.log('Cart component - cartItems:', cartItems);
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <FaShoppingCart size={64} className="empty-cart-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Add some plants to your cart to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                  <FaPlus />
                </button>
              </div>
              <div className="item-info">
                <p className="item-category">{item.category}</p>
                <p className="item-price">₹{item.price}</p>
              </div>
            </div>
            <div className="item-total">
              <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total-section">
          <h3>Total: ₹{getTotalPrice().toFixed(2)}</h3>
          <button 
            className="checkout-btn"
            onClick={onProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;