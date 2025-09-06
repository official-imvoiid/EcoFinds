import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = ({ children }) => {
  return (
    <div className="main-content">
      <div className="dashboard-menu">
        <Link to="/dashboard">
          <button className="btn btn-primary">Browse Products</button>
        </Link>
        <Link to="/create-listing">
          <button className="btn btn-secondary">Create Listing</button>
        </Link>
        <Link to="/my-listings">
          <button className="btn btn-primary">My Listings</button>
        </Link>
        <Link to="/purchases">
          <button className="btn btn-primary">My Purchases</button>
        </Link>
        <Link to="/profile">
          <button className="btn btn-primary">Profile</button>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default Dashboard