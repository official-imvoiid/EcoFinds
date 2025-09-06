import React, { useState, useEffect } from 'react'

const EditListingModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    price: '',
    image: ''
  })
  const [imageUploadType, setImageUploadType] = useState('url')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const categories = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Sports', 'Toys', 'Other']

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price.toString(),
        image: product.image || ''
      })
      
      // Check if existing image is a data URL (uploaded image)
      if (product.image && product.image.startsWith('data:')) {
        setImageUploadType('upload')
        setUploadedImage(product.image)
      } else {
        setImageUploadType('url')
      }
    }
  }, [product])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    processImageFile(file)
  }

  const processImageFile = (file) => {
    if (!file) return
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, GIF, WebP)')
      return
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setUploadedImage(reader.result)
      setFormData({
        ...formData,
        image: reader.result
      })
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.price) {
      alert('Please fill in all required fields')
      return
    }

    const price = parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price')
      return
    }

    const updatedProduct = {
      ...product,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: price,
      image: imageUploadType === 'upload' ? uploadedImage : formData.image
    }

    onSave(updatedProduct)
  }

  const handleModalClick = (e) => {
    if (e.target.className.includes('modal')) {
      onClose()
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    setFormData({
      ...formData,
      image: ''
    })
  }

  if (!product) return null

  return (
    <div className="modal active" onClick={handleModalClick} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="modal-content" style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px',
        padding: '24px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        <div className="modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#2d3748' }}>Edit Listing</h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#718096',
            padding: 0,
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s'
          }} onMouseOver={(e) => e.target.style.backgroundColor = '#f7fafc'}>
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '16px',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4299e1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '16px',
                resize: 'vertical',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4299e1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '16px',
                backgroundColor: 'white',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4299e1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '16px',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4299e1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>Product Image</label>
            
            {/* Image upload type selector */}
            <div style={{ 
              display: 'flex', 
              marginBottom: '16px',
              backgroundColor: '#f7fafc',
              borderRadius: '8px',
              padding: '4px',
              width: 'fit-content'
            }}>
              <button
                type="button"
                onClick={() => {
                  setImageUploadType('url')
                  setUploadedImage(null)
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: imageUploadType === 'url' ? '#4299e1' : 'transparent',
                  color: imageUploadType === 'url' ? 'white' : '#4a5568',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Image URL
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageUploadType('upload')
                  if (imageUploadType === 'url') {
                    setFormData({ ...formData, image: '' })
                  }
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: imageUploadType === 'upload' ? '#4299e1' : 'transparent',
                  color: imageUploadType === 'upload' ? 'white' : '#4a5568',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Upload Image
              </button>
            </div>

            {/* URL input */}
            {imageUploadType === 'url' && (
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                  marginBottom: '16px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            )}

            {/* File upload with drag and drop */}
            {imageUploadType === 'upload' && (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${isDragging ? '#4299e1' : '#cbd5e0'}`,
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: isDragging ? '#ebf8ff' : '#f7fafc',
                  transition: 'all 0.3s',
                  marginBottom: '16px'
                }}
              >
                <div style={{ marginBottom: '12px', color: '#4a5568' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <p style={{ margin: '8px 0', fontWeight: '500' }}>Drag & drop your image here</p>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>or</p>
                </div>
                <label htmlFor="file-upload" style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#4299e1',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }} onMouseOver={(e) => e.target.style.backgroundColor = '#3182ce'}>
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <p style={{ fontSize: '12px', color: '#718096', marginTop: '12px' }}>
                  Accepted formats: JPG, PNG, GIF, WebP (Max size: 5MB)
                </p>
              </div>
            )}

            {/* Image preview */}
            {(uploadedImage || (imageUploadType === 'url' && formData.image)) && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ marginBottom: '12px', fontWeight: '500', color: '#4a5568' }}>Image Preview:</p>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{ 
                    width: '150px', 
                    height: '150px', 
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img 
                      src={uploadedImage || formData.image} 
                      alt="Product preview" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #718096; background: #f7fafc;">Invalid image URL</div>'
                      }}
                    />
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c53030'}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#e2e8f0',
                color: '#4a5568',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#cbd5e0'}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{
                padding: '10px 20px',
                backgroundColor: '#48bb78',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#38a169'}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditListingModal