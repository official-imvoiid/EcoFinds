// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import BrowseProducts from './components/BrowseProducts';
import CreateListing from './components/CreateListing';
import MyListings from './components/MyListings';
import Purchases from './components/Purchases';
import Profile from './components/Profile';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import './App.css'; // We'll create this CSS file

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
  };

  const handleAddToCart = (product) => {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // If exists, increase quantity
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // If new, add to cart with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show a subtle notification instead of alert
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">✓</span>
        <span>${product.title} added to cart!</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading EcoFinds...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Header 
          currentUser={currentUser} 
          cartCount={cart.reduce((total, item) => total + item.quantity, 0)} 
          onLogout={handleLogout} 
        />
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <Dashboard>
                <BrowseProducts 
                  onProductClick={handleProductClick} 
                  currentUser={currentUser} 
                  onAddToCart={handleAddToCart} 
                />
              </Dashboard>
            } />
            <Route path="/create-listing" element={
              <Dashboard>
                <CreateListing currentUser={currentUser} />
              </Dashboard>
            } />
            <Route path="/my-listings" element={
              <Dashboard>
                <MyListings currentUser={currentUser} />
              </Dashboard>
            } />
            <Route path="/purchases" element={
              <Dashboard>
                <Purchases currentUser={currentUser} />
              </Dashboard>
            } />
            <Route path="/profile" element={
              <Dashboard>
                <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
              </Dashboard>
            } />
            <Route path="/cart" element={
              <Cart 
                cart={cart} 
                onRemoveFromCart={handleRemoveFromCart} 
                onClearCart={handleClearCart} 
                currentUser={currentUser} 
              />
            } />
          </Routes>
        </main>

        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            currentUser={currentUser} 
            onClose={handleCloseModal} 
            onAddToCart={handleAddToCart} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;