import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

const Purchases = ({ currentUser }) => {
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    loadPurchases()
  }, [currentUser])

  const loadPurchases = () => {
    const allPurchases = JSON.parse(localStorage.getItem('purchases') || '[]')
    const userPurchases = allPurchases.filter(p => p.buyerId === currentUser.id)
    setPurchases(userPurchases)
  }

  return (
    <div>
      <h2>My Purchases</h2>
      
      {purchases.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#718096', marginTop: '40px' }}>
          You haven't made any purchases yet. Start shopping for sustainable second-hand items!
        </p>
      ) : (
        <div className="products-grid">
          {purchases.map(purchase => (
            <div key={purchase.id} className="product-card">
              <div className="product-image">
                {purchase.image ? (
                  <img 
                    src={purchase.image} 
                    alt={purchase.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  '📦'
                )}
              </div>
              <div className="product-title">{purchase.title}</div>
              <div className="product-price">${purchase.price}</div>
              <div className="product-category">{purchase.category}</div>
              <div style={{ marginTop: '10px', color: '#48bb78' }}>
                ✓ Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Purchases