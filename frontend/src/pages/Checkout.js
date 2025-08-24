import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaMapMarkerAlt, FaPhone, FaCreditCard } from 'react-icons/fa';
import './Checkout.css';

const Checkout = ({ cartItems, onOrderComplete }) => {
  console.log('Checkout component - cartItems:', cartItems);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState('');
  const [buyerDetails, setBuyerDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    // Get Razorpay key from backend
    const fetchRazorpayKey = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${baseURL}/payment/key`);
        const data = await response.json();
        setRazorpayKey(data.key);
      } catch (error) {
        console.error('Error fetching Razorpay key:', error);
      }
    };

    fetchRazorpayKey();
  }, []);

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, address, phone } = buyerDetails;
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    
    if (!phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    
    if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Create order on backend
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const orderResponse = await fetch(`${baseURL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getTotalAmount(),
          currency: 'INR',
          receipt: `order_${Date.now()}`
        })
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Initialize Razorpay payment
      const options = {
        key: razorpayKey,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'BloomCart',
        description: 'Premium Plant Collection',
        image: '/favicon-32x32.png', // Your logo
        order_id: orderData.order.id,
        prefill: {
          name: buyerDetails.name,
          email: buyerDetails.email,
          contact: buyerDetails.phone
        },
        notes: {
          address: buyerDetails.address
        },
        theme: {
          color: '#4caf50',
          backdrop_color: 'rgba(0,0,0,0.5)'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast.info('Payment cancelled');
          }
        },
        handler: async function (response) {
          // Verify payment on backend
          try {
            const verifyResponse = await fetch('http://localhost:5000/api/payment/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                buyer_details: buyerDetails,
                items: cartItems
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast.success('Payment successful!');
              onOrderComplete(verifyData.order);
              navigate('/order-success');
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast.info('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No items to checkout</h2>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Buyer Details</h2>
          
          <div className="form-group">
            <label htmlFor="name">
              <FaUser /> Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={buyerDetails.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">
              <FaMapMarkerAlt /> Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={buyerDetails.address}
              onChange={handleInputChange}
              placeholder="Enter your complete address"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <FaPhone /> Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={buyerDetails.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaUser /> Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={buyerDetails.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item._id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{getTotalAmount().toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-row total-final">
              <span>Total:</span>
              <span>₹{getTotalAmount().toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            className="pay-now-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            <FaCreditCard />
            {loading ? 'Processing...' : `Pay ₹${getTotalAmount().toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;