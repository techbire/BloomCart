import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddPlant from './pages/AddPlant';
import PlantDetail from './pages/PlantDetail';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import './App.css';

// ScrollToTop component to handle automatic scrolling on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('plantStoreCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('plantStoreCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('plantStoreCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (plant) => {
    console.log('Adding to cart:', plant);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === plant._id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item._id === plant._id 
            ? { ...item, quantity: item.quantity + (plant.quantity || 1) }
            : item
        );
      } else {
        return [...prevItems, { ...plant, quantity: plant.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (plantId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== plantId));
  };

  const updateQuantity = (plantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === plantId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleBuyNow = (items) => {
    console.log('Buy now with items:', items);
    // For buy now, set cart to only the selected items
    setCartItems(items);
    // Navigate to checkout using React Router
    navigate('/checkout');
  };

  const handleOrderComplete = (orderData) => {
    clearCart();
    console.log('Order completed:', orderData);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    setShowCart(false);
    navigate('/checkout');
  };

  return (
    <div className="App">
      <Header 
        cartItemCount={getCartItemCount()}
        onCartClick={() => setShowCart(true)}
      />
  <main className="app-main">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/add-plant" element={<AddPlant />} />
          <Route 
            path="/plant/:id" 
            element={
              <PlantDetail 
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cartItems={cartItems}
                onOrderComplete={handleOrderComplete}
              />
            } 
          />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>
      <Footer />

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button 
                className="close-cart-btn"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>
            <Cart 
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
