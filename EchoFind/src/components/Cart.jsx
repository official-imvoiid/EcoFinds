// Cart.jsx
import React from 'react'

const Cart = ({ cart, onRemoveFromCart, onClearCart, currentUser }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }

    // Get existing purchases
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]')
    const products = JSON.parse(localStorage.getItem('products') || '[]')

    // Add items to purchases
    cart.forEach(item => {
      purchases.push({
        ...item,
        buyerId: currentUser.id,
        purchaseDate: new Date().toISOString()
      })
    })

    // Remove purchased items from products listing
    const purchasedIds = cart.map(item => item.id)
    const remainingProducts = products.filter(p => !purchasedIds.includes(p.id))

    // Save updates
    localStorage.setItem('purchases', JSON.stringify(purchases))
    localStorage.setItem('products', JSON.stringify(remainingProducts))

    // Clear cart
    onClearCart()

    alert('Purchase successful! Thank you for choosing sustainable shopping with EcoFinds!')
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#718096', marginTop: '40px' }}>
          Your cart is empty. Browse products to start shopping!
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '10px',
                backgroundColor: 'white'
              }}>
                <div>
                  <strong>{item.title}</strong>
                  <p>${item.price} x {item.quantity}</p>
                  <p style={{ color: '#718096', fontSize: '14px' }}>
                    Seller: {item.username}
                  </p>
                </div>
                <button 
                  className="btn btn-danger" 
                  onClick={() => onRemoveFromCart(item.id)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button 
              className="btn btn-secondary" 
              onClick={handleCheckout}
              style={{ 
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#48bb78',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart