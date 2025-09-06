// This is a mock server component that would normally handle API calls
// In a real application, this would be replaced with actual API calls to your backend

export const api = {
  // Authentication
  async register(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already registered')
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    return { user: newUser, token: `mock-token-${newUser.id}` }
  },

  async login(credentials) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => 
      u.email === credentials.email && u.password === credentials.password
    )
    
    if (!user) {
      throw new Error('Invalid credentials')
    }
    
    return { user, token: `mock-token-${user.id}` }
  },

  // Products
  async getProducts(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    let products = JSON.parse(localStorage.getItem('products') || '[]')
    
    if (filters.category) {
      products = products.filter(p => p.category === filters.category)
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      products = products.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      )
    }
    
    if (filters.userId) {
      products = products.filter(p => p.userId === filters.userId)
    }
    
    return products
  },

  async createProduct(productData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    
    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toISOString()
    }
    
    products.push(newProduct)
    localStorage.setItem('products', JSON.stringify(products))
    
    return newProduct
  },

  async updateProduct(productId, productData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    const productIndex = products.findIndex(p => p.id === productId)
    
    if (productIndex === -1) {
      throw new Error('Product not found')
    }
    
    products[productIndex] = {
      ...products[productIndex],
      ...productData,
      updatedAt: new Date().toISOString()
    }
    
    localStorage.setItem('products', JSON.stringify(products))
    
    return products[productIndex]
  },

  async deleteProduct(productId) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    const filteredProducts = products.filter(p => p.id !== productId)
    
    localStorage.setItem('products', JSON.stringify(filteredProducts))
    
    return { success: true }
  },

  // Cart operations
  async getCart(userId) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]')
    return cart
  },

  async addToCart(userId, product) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]')
    
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      throw new Error('Product already in cart')
    }
    
    cart.push({ ...product, quantity: 1 })
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart))
    
    return cart
  },

  async removeFromCart(userId, productId) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]')
    const filteredCart = cart.filter(item => item.id !== productId)
    
    localStorage.setItem(`cart_${userId}`, JSON.stringify(filteredCart))
    
    return filteredCart
  },

  async clearCart(userId) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    localStorage.setItem(`cart_${userId}`, JSON.stringify([]))
    
    return []
  },

  // Purchases
  async checkout(userId, cartItems, shippingAddress) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]')
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    
    // Create purchase record
    const purchase = {
      id: Date.now(),
      buyerId: userId,
      items: cartItems,
      totalAmount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      shippingAddress,
      purchaseDate: new Date().toISOString(),
      status: 'pending'
    }
    
    purchases.push(purchase)
    localStorage.setItem('purchases', JSON.stringify(purchases))
    
    // Remove purchased items from products
    const purchasedIds = cartItems.map(item => item.id)
    const remainingProducts = products.filter(p => !purchasedIds.includes(p.id))
    localStorage.setItem('products', JSON.stringify(remainingProducts))
    
    // Clear user's cart
    await this.clearCart(userId)
    
    return purchase
  },

  async getPurchases(userId) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]')
    return purchases.filter(p => p.buyerId === userId)
  },

  // User profile
  async updateProfile(userId, profileData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...profileData,
      updatedAt: new Date().toISOString()
    }
    
    localStorage.setItem('users', JSON.stringify(users))
    
    return users[userIndex]
  }
}

// Error handling wrapper
export const handleApiCall = async (apiCall) => {
  try {
    return await apiCall()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Usage examples:
// import { api, handleApiCall } from './components/server'
// 
// const products = await handleApiCall(() => api.getProducts({ category: 'Electronics' }))
// const user = await handleApiCall(() => api.login({ email, password }))