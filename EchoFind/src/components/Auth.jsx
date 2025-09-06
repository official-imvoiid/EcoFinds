import React, { useState } from 'react'

const Auth = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const toggleAuth = () => {
    setIsRegistering(!isRegistering)
    setFormData({ email: '', password: '', username: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }

    if (isRegistering && !formData.username) {
      alert('Please choose a username')
      return
    }

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    if (isRegistering) {
      // Register new user
      if (users.find(u => u.email === formData.email)) {
        alert('Email already registered')
        return
      }

      const newUser = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        username: formData.username,
        phone: '',
        address: ''
      }

      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      onLogin(newUser)
    } else {
      // Login existing user
      const user = users.find(u => u.email === formData.email && u.password === formData.password)
      if (user) {
        onLogin(user)
      } else {
        alert('Invalid email or password')
      }
    }
  }

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        
        {isRegistering && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>
        )}
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          {isRegistering ? 'Sign Up' : 'Login'}
        </button>
        
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          <span>{isRegistering ? 'Already have an account?' : "Don't have an account?"}</span>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleAuth(); }} style={{ color: '#667eea', marginLeft: '5px' }}>
            {isRegistering ? 'Login' : 'Sign Up'}
          </a>
        </p>
      </form>
    </div>
  )
}

export default Auth