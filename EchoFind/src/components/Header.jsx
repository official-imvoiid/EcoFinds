import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentUser, cartCount, onLogout }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="header" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      background: 'linear-gradient(135deg, #2d3748, #1a202c)',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxSizing: 'border-box',
      height: '70px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    }}>
      <div className="logo" style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ 
          fontSize: '28px',
          animation: 'spin 3s linear infinite',
          display: 'inline-block'
        }}>🌿</span>
        EcoFinds
      </div>
      
      {currentUser && (
        <div className="nav-buttons" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/dashboard">
            <button 
              className="btn btn-dashboard"
              style={{
                padding: '10px 16px',
                backgroundColor: hoveredButton === 'dashboard' ? '#2b6cb0' : '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: hoveredButton === 'dashboard' ? '0 6px 12px rgba(49, 130, 206, 0.4)' : '0 4px 8px rgba(49, 130, 206, 0.3)',
                transform: hoveredButton === 'dashboard' ? 'translateY(-2px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredButton('dashboard')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Dashboard
            </button>
          </Link>
          
          <Link to="/cart" style={{ position: 'relative', display: 'inline-block' }}>
            <button 
              className="btn btn-cart"
              style={{
                padding: '10px 16px',
                backgroundColor: hoveredButton === 'cart' ? '#6b46c1' : '#805ad5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: hoveredButton === 'cart' ? '0 6px 12px rgba(128, 90, 213, 0.4)' : '0 4px 8px rgba(128, 90, 213, 0.3)',
                transform: hoveredButton === 'cart' ? 'translateY(-2px)' : 'translateY(0)',
                width: '80px'
              }}
              onMouseEnter={() => setHoveredButton('cart')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Cart
            </button>
            
            {cartCount > 0 && (
              <span className="badge" style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#e53e3e',
                color: 'white',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                animation: 'pulse 2s infinite',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
          
          <button 
            className="btn btn-logout"
            onClick={onLogout}
            style={{
              padding: '10px 16px',
              backgroundColor: hoveredButton === 'logout' ? '#c53030' : '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              boxShadow: hoveredButton === 'logout' ? '0 6px 12px rgba(229, 62, 62, 0.4)' : '0 4px 8px rgba(229, 62, 62, 0.3)',
              transform: hoveredButton === 'logout' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setHoveredButton('logout')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Logout
          </button>
        </div>
      )}
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Header;