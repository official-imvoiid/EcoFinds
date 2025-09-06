import React, { useState, useEffect } from 'react'

const Profile = ({ currentUser, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
      })
    }
  }, [currentUser])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.username || !formData.email) {
      alert('Username and email are required')
      return
    }

    // Update current user
    const updatedUser = {
      ...currentUser,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    }

    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem('users', JSON.stringify(users))
    }

    // Update current user in localStorage and state
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)

    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div>
      <h2>My Profile</h2>
      
      {showSuccess && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Enter your address"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default Profile