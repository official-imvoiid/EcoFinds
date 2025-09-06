import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import EditListingModal from './EditListingModal'

const MyListings = ({ currentUser }) => {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      const allProducts = JSON.parse(savedProducts)
      const userProducts = allProducts.filter(p => p.userId === currentUser.id)
      setProducts(userProducts)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
  }

  const handleSaveEdit = (updatedProduct) => {
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]')
    const updatedProducts = allProducts.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    )
    
    localStorage.setItem('products', JSON.stringify(updatedProducts))
    setProducts(updatedProducts.filter(p => p.userId === currentUser.id))
    setEditingProduct(null)
  }

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      const allProducts = JSON.parse(localStorage.getItem('products') || '[]')
      const updatedProducts = allProducts.filter(p => p.id !== productId)
      
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      setProducts(updatedProducts.filter(p => p.userId === currentUser.id))
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name ? a.name.localeCompare(b.name || '') : 0
    }
    if (sortBy === 'price') {
      return (a.price || 0) - (b.price || 0)
    }
    if (sortBy === 'date') {
      return (b.id || 0) - (a.id || 0) // Assuming higher ID means newer
    }
    return 0
  })

  return (
    <div>
      <h2>My Listings</h2>
      
      {products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#718096', marginTop: '40px' }}>
          You haven't created any listings yet. Create your first listing to start selling!
        </p>
      ) : (
        <>
          <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className="products-grid">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
      
      {editingProduct && (
        <EditListingModal
          product={editingProduct}
          onSave={handleSaveEdit}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}

export default MyListings