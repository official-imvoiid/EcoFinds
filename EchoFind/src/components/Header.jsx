// Header.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ currentUser, cartCount, onLogout }) => {
  return (
    <div className="header" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#2d3748',
      color: 'white'
    }}>
      <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>🌿 EcoFinds</div>
      {currentUser && (
        <div className="nav-buttons" style={{ display: 'flex', gap: '10px' }}>
          <Link to="/dashboard">
            <button className="btn btn-primary" style={{
              padding: '8px 12px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Dashboard</button>
          </Link>
          <Link to="/cart">
            <button className="btn btn-secondary" style={{
              padding: '8px 12px',
              backgroundColor: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              position: 'relative'
            }}>
              Cart {cartCount > 0 && (
                <span className="badge" style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>{cartCount}</span>
              )}
            </button>
          </Link>
          <button className="btn btn-danger" onClick={onLogout} style={{
            padding: '8px 12px',
            backgroundColor: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Header