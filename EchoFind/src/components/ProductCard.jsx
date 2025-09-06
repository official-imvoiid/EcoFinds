import React from 'react'

const ProductCard = ({ product, onClick, showActions = false, onEdit, onDelete, onAddToCart, currentUser }) => {
  const handleImageError = (e) => {
    // If image fails to load, show placeholder
    e.target.style.display = 'none'
    e.target.parentElement.innerHTML = '<div style="font-size: 48px;">📦</div>'
  }

  const handleAddToCart = (e) => {
    e.stopPropagation() // Prevent card click
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  // Check if this is user's own product
  const isOwnProduct = currentUser && (String(product.userId) === String(currentUser.id))

  return (
    <div className="product-card" onClick={onClick} style={{ position: 'relative' }}>
      <div className="product-image">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={handleImageError}
          />
        ) : (
          <div style={{ fontSize: '48px' }}>📦</div>
        )}
      </div>
      
      {/* Add to Cart Button - only show if not user's own product and onAddToCart function exists */}
      {!isOwnProduct && onAddToCart && (
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#38a169'
            e.target.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#48bb78'
            e.target.style.transform = 'scale(1)'
          }}
          title="Add to Cart"
        >
          +
        </button>
      )}
      
      <div className="product-title">{product.title}</div>
      <div className="product-price">${product.price}</div>
      <div className="product-category">{product.category}</div>
      
      {showActions && (
        <div style={{ marginTop: '10px' }} onClick={(e) => e.stopPropagation()}>
          <button 
            className="btn btn-primary" 
            onClick={(e) => { e.stopPropagation(); onEdit(product); }}
            style={{ marginRight: '10px' }}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger" 
            onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductCard