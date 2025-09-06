import React from 'react'

const ProductModal = ({ product, currentUser, onClose, onAddToCart }) => {
  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart(product)
  }

  const handleModalClick = (e) => {
    if (e.target.className.includes('modal')) {
      onClose()
    }
  }

  const handleImageError = (e) => {
    // If image fails to load, show placeholder
    e.target.style.display = 'none'
    e.target.parentElement.innerHTML = '<div style="font-size: 100px;">📦</div>'
  }

  // Convert both IDs to strings for comparison to avoid type issues
  const isOwnProduct = currentUser && (String(product.userId) === String(currentUser.id))

  return (
    <div className="modal active" onClick={handleModalClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Product Details</h2>
          <span className="close-modal" onClick={onClose}>&times;</span>
        </div>
        
        <div className="product-detail-header">
          <div className="product-detail-image">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                onError={handleImageError}
              />
            ) : (
              <div style={{ fontSize: '100px', textAlign: 'center' }}>📦</div>
            )}
          </div>
          <div className="product-detail-info" style={{ flex: 1 }}>
            <h2>{product.title}</h2>
            <p style={{ fontSize: '24px', color: '#48bb78', fontWeight: 'bold' }}>
              ${product.price}
            </p>
            <p style={{ color: '#718096', margin: '10px 0' }}>
              Category: {product.category}
            </p>
            <p style={{ margin: '20px 0' }}>{product.description}</p>
            <p style={{ color: '#718096' }}>Seller: {product.username}</p>
            

            
            {!isOwnProduct ? (
              <button 
                className="btn btn-secondary" 
                onClick={handleAddToCart}
                style={{ marginTop: '20px' }}
              >
                Add to Cart
              </button>
            ) : (
              <p style={{ color: '#718096', marginTop: '20px' }}>
                This is your listing
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal