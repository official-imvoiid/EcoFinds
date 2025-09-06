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
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
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
    <div className="modal active" onClick={handleModalClick}>
      <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <h2>Edit Listing</h2>
          <span className="close-modal" onClick={onClose}>&times;</span>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Product Image (optional)</label>
            
            {/* Image upload type selector */}
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '20px' }}>
                <input
                  type="radio"
                  value="url"
                  checked={imageUploadType === 'url'}
                  onChange={(e) => {
                    setImageUploadType(e.target.value)
                    setUploadedImage(null)
                  }}
                  style={{ marginRight: '5px' }}
                />
                Image URL
              </label>
              <label>
                <input
                  type="radio"
                  value="upload"
                  checked={imageUploadType === 'upload'}
                  onChange={(e) => {
                    setImageUploadType(e.target.value)
                    if (imageUploadType === 'url') {
                      setFormData({ ...formData, image: '' })
                    }
                  }}
                  style={{ marginRight: '5px' }}
                />
                Upload Image
              </label>
            </div>

            {/* URL input */}
            {imageUploadType === 'url' && (
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
              />
            )}

            {/* File upload */}
            {imageUploadType === 'upload' && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ marginBottom: '10px' }}
                />
                <p style={{ fontSize: '12px', color: '#718096' }}>
                  Accepted formats: JPG, PNG, GIF, WebP (Max size: 5MB)
                </p>
              </div>
            )}

            {/* Image preview */}
            {(uploadedImage || (imageUploadType === 'url' && formData.image)) && (
              <div style={{ marginTop: '15px' }}>
                <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Image Preview:</p>
                <div style={{ 
                  width: '200px', 
                  height: '200px', 
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
                      e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #718096;">Invalid image URL</div>'
                    }}
                  />
                </div>
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    marginTop: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#f56565',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditListingModal