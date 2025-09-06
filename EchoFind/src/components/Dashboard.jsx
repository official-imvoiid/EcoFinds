import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Dashboard = ({ children }) => {
  const location = useLocation()
  
  // Simple style without hover effects
  const linkStyle = (path) => ({
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: location.pathname === path ? '#3182ce' : 'transparent',
    color: location.pathname === path ? 'white' : '#4a5568',
    display: 'inline-block',
    margin: '0 5px',
    transition: 'background-color 0.2s ease, color 0.2s ease'
  })

  return (
    <div className="main-content">
      <div className="dashboard-menu" style={{ 
        display: 'flex', 
        gap: '5px', 
        marginBottom: '20px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Link 
          to="/dashboard" 
          style={linkStyle('/dashboard')}
        >
          Browse Products
        </Link>
        <Link 
          to="/create-listing" 
          style={linkStyle('/create-listing')}
        >
          Create Listing
        </Link>
        <Link 
          to="/my-listings" 
          style={linkStyle('/my-listings')}
        >
          My Listings
        </Link>
        <Link 
          to="/purchases" 
          style={linkStyle('/purchases')}
        >
          My Purchases
        </Link>
        <Link 
          to="/profile" 
          style={linkStyle('/profile')}
        >
          Profile
        </Link>
      </div>
      {children}
    </div>
  )
}

export default Dashboard