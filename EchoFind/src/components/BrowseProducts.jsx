import React, { useState, useEffect } from 'react'

// ProductCard component with add to cart functionality
const ProductCard = ({ product, onClick, showActions = false, onEdit, onDelete, onAddToCart, currentUser }) => {
  const handleImageError = (e) => {
    e.target.style.display = 'none'
    e.target.parentElement.innerHTML = '<div style="font-size: 48px;">📦</div>'
  }

  const handleAddToCart = (e) => {
    e.stopPropagation() // Prevent card click
    console.log('Button clicked, product:', product.title)
    console.log('onAddToCart function exists:', !!onAddToCart)
    
    if (onAddToCart) {
      console.log('Calling onAddToCart...')
      onAddToCart(product)
    } else {
      alert('onAddToCart function is missing!')
    }
  }

  // Check if this is user's own product
  const isOwnProduct = currentUser && (String(product.userId) === String(currentUser.id))

  return (
    <div className="product-card" onClick={onClick} style={{ 
      position: 'relative',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '308px',
      backgroundColor: 'white'
    }}>
      <div className="product-image" style={{ 
        height: '200px', 
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7fafc',
        borderRadius: '4px'
      }}>
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
      
      <div className="product-title" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        {product.title}
      </div>
      <div className="product-price" style={{ fontSize: '18px', color: '#48bb78', marginBottom: '4px' }}>
        ${product.price}
      </div>
      <div className="product-category" style={{ fontSize: '14px', color: '#718096' }}>
        {product.category}
      </div>
      
      {showActions && (
        <div style={{ marginTop: '10px' }} onClick={(e) => e.stopPropagation()}>
          <button 
            className="btn btn-primary" 
            onClick={(e) => { e.stopPropagation(); onEdit(product); }}
            style={{ 
              marginRight: '10px',
              padding: '4px 8px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger" 
            onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
            style={{
              padding: '4px 8px',
              backgroundColor: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

// Main BrowseProducts component with all 42 products 
const BrowseProducts = ({ onProductClick, currentUser, onAddToCart }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Sports', 'Toys', 'Other']

  useEffect(() => {
    // Load products from localStorage or initialize with sample products - all 42 items
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      const productsList = JSON.parse(savedProducts)
      setProducts(productsList)
      setFilteredProducts(productsList)
    } else {
      // Initialize with sample products - 6 per category (42 total)
      const sampleProducts = [
        // Electronics (6 items)
        {
          id: Date.now() + 1,
          title: "Smartphone Pro Max",
          description: "Latest model smartphone with 256GB storage and amazing camera.",
          category: "Electronics",
          price: 999,
          image: "phone1.png",
          userId: "sample",
          username: "TechStore"
        },
        {
          id: Date.now() + 2,
          title: "Wireless Headphones",
          description: "Noise-cancelling Bluetooth headphones with 30-hour battery life.",
          category: "Electronics",
          price: 199,
          image: "headphones1.png",
          userId: "sample",
          username: "AudioHub"
        },
        {
          id: Date.now() + 3,
          title: "4K Webcam",
          description: "Professional webcam for streaming and video calls.",
          category: "Electronics",
          price: 149,
          image: "webcam1.png",
          userId: "sample",
          username: "TechGear"
        },
        {
          id: Date.now() + 4,
          title: "Gaming Laptop",
          description: "High-performance laptop with RTX graphics card.",
          category: "Electronics",
          price: 1499,
          image: "laptop1.png",
          userId: "sample",
          username: "GameZone"
        },
        {
          id: Date.now() + 5,
          title: "Smart Watch",
          description: "Fitness tracking smartwatch with heart rate monitor.",
          category: "Electronics",
          price: 299,
          image: "watch1.png",
          userId: "sample",
          username: "FitTech"
        },
        {
          id: Date.now() + 6,
          title: "Tablet 10 inch",
          description: "Lightweight tablet perfect for reading and browsing.",
          category: "Electronics",
          price: 399,
          image: "tablet1.png",
          userId: "sample",
          username: "TabStore"
        },

        // Clothing (6 items)
        {
          id: Date.now() + 7,
          title: "Denim Jacket",
          description: "Classic blue denim jacket, unisex style. Size L.",
          category: "Clothing",
          price: 79,
          image: "jacket1.png",
          userId: "sample",
          username: "FashionHub"
        },
        {
          id: Date.now() + 8,
          title: "Running Shoes",
          description: "Comfortable athletic shoes, size 10, barely used.",
          category: "Clothing",
          price: 89,
          image: "shoes1.png",
          userId: "sample",
          username: "SportStyle"
        },
        {
          id: Date.now() + 9,
          title: "Summer Dress",
          description: "Floral print summer dress, size M, perfect condition.",
          category: "Clothing",
          price: 45,
          image: "dress1.png",
          userId: "sample",
          username: "ChicBoutique"
        },
        {
          id: Date.now() + 10,
          title: "Leather Belt",
          description: "Genuine leather belt, brown color, adjustable size.",
          category: "Clothing",
          price: 35,
          image: "belt1.png",
          userId: "sample",
          username: "Accessories+"
        },
        {
          id: Date.now() + 11,
          title: "Winter Coat",
          description: "Warm winter coat with hood, waterproof, size XL.",
          category: "Clothing",
          price: 120,
          image: "coat1.png",
          userId: "sample",
          username: "WinterWear"
        },
        {
          id: Date.now() + 12,
          title: "Vintage T-Shirt",
          description: "Retro band t-shirt, rare find, size L.",
          category: "Clothing",
          price: 25,
          image: "tshirt1.png",
          userId: "sample",
          username: "VintageFinds"
        },

        // Books (6 items)
        {
          id: Date.now() + 13,
          title: "JavaScript Complete Guide",
          description: "Comprehensive JavaScript programming book, latest edition.",
          category: "Books",
          price: 45,
          image: "book1.png",
          userId: "sample",
          username: "BookWorld"
        },
        {
          id: Date.now() + 14,
          title: "Fantasy Novel Collection",
          description: "Set of 5 bestselling fantasy novels, mint condition.",
          category: "Books",
          price: 60,
          image: "book2.png",
          userId: "sample",
          username: "NovelNook"
        },
        {
          id: Date.now() + 15,
          title: "Cookbook Masterclass",
          description: "Professional cooking techniques and recipes book.",
          category: "Books",
          price: 35,
          image: "book3.png",
          userId: "sample",
          username: "CulinaryBooks"
        },
        {
          id: Date.now() + 16,
          title: "Business Strategy",
          description: "Modern business management and strategy guide.",
          category: "Books",
          price: 50,
          image: "book4.png",
          userId: "sample",
          username: "BizBooks"
        },
        {
          id: Date.now() + 17,
          title: "Art History",
          description: "Illustrated art history from ancient to modern times.",
          category: "Books",
          price: 70,
          image: "book5.png",
          userId: "sample",
          username: "ArtLit"
        },
        {
          id: Date.now() + 18,
          title: "Science Encyclopedia",
          description: "Complete science reference book for students.",
          category: "Books",
          price: 55,
          image: "book6.png",
          userId: "sample",
          username: "EduBooks"
        },

        // Furniture (6 items)
        {
          id: Date.now() + 19,
          title: "Office Chair",
          description: "Ergonomic office chair with lumbar support, black.",
          category: "Furniture",
          price: 150,
          image: "chair1.png",
          userId: "sample",
          username: "OfficeDepot"
        },
        {
          id: Date.now() + 20,
          title: "Coffee Table",
          description: "Modern glass coffee table with wooden legs.",
          category: "Furniture",
          price: 200,
          image: "table1.png",
          userId: "sample",
          username: "HomeFurnish"
        },
        {
          id: Date.now() + 21,
          title: "Bookshelf",
          description: "5-tier wooden bookshelf, perfect condition.",
          category: "Furniture",
          price: 120,
          image: "shelf1.png",
          userId: "sample",
          username: "StoragePlus"
        },
        {
          id: Date.now() + 22,
          title: "Desk Lamp",
          description: "Adjustable LED desk lamp with USB charging port.",
          category: "Furniture",
          price: 45,
          image: "lamp1.png",
          userId: "sample",
          username: "LightHouse"
        },
        {
          id: Date.now() + 23,
          title: "Sofa 3-Seater",
          description: "Comfortable grey fabric sofa, excellent condition.",
          category: "Furniture",
          price: 450,
          image: "sofa1.png",
          userId: "sample",
          username: "ComfortZone"
        },
        {
          id: Date.now() + 24,
          title: "Standing Desk",
          description: "Height adjustable standing desk with electric motor.",
          category: "Furniture",
          price: 350,
          image: "desk1.png",
          userId: "sample",
          username: "WorkSpace"
        },

        // Sports (6 items)
        {
          id: Date.now() + 25,
          title: "Yoga Mat",
          description: "Premium non-slip yoga mat with carrying strap.",
          category: "Sports",
          price: 30,
          image: "yoga1.png",
          userId: "sample",
          username: "FitGear"
        },
        {
          id: Date.now() + 26,
          title: "Tennis Racket",
          description: "Professional tennis racket with case, barely used.",
          category: "Sports",
          price: 120,
          image: "tennis1.png",
          userId: "sample",
          username: "SportsPro"
        },
        {
          id: Date.now() + 27,
          title: "Dumbbells Set",
          description: "Adjustable dumbbells set 5-25 lbs with rack.",
          category: "Sports",
          price: 180,
          image: "weights1.png",
          userId: "sample",
          username: "GymEquip"
        },
        {
          id: Date.now() + 28,
          title: "Basketball",
          description: "Official size basketball, indoor/outdoor use.",
          category: "Sports",
          price: 35,
          image: "ball1.png",
          userId: "sample",
          username: "BallGames"
        },
        {
          id: Date.now() + 29,
          title: "Bicycle Helmet",
          description: "Safety certified bike helmet with LED light.",
          category: "Sports",
          price: 55,
          image: "helmet1.png",
          userId: "sample",
          username: "CycleSafe"
        },
        {
          id: Date.now() + 30,
          title: "Swimming Goggles",
          description: "Anti-fog swimming goggles with UV protection.",
          category: "Sports",
          price: 25,
          image: "goggles1.png",
          userId: "sample",
          username: "SwimStore"
        },

        // Toys (6 items)
        {
          id: Date.now() + 31,
          title: "LEGO City Set",
          description: "Complete LEGO city building set, 500+ pieces.",
          category: "Toys",
          price: 75,
          image: "lego1.png",
          userId: "sample",
          username: "ToyLand"
        },
        {
          id: Date.now() + 32,
          title: "Remote Control Car",
          description: "Fast RC car with rechargeable battery.",
          category: "Toys",
          price: 60,
          image: "rccar1.png",
          userId: "sample",
          username: "RCWorld"
        },
        {
          id: Date.now() + 33,
          title: "Board Game Collection",
          description: "Set of 3 popular family board games.",
          category: "Toys",
          price: 45,
          image: "games1.png",
          userId: "sample",
          username: "GameNight"
        },
        {
          id: Date.now() + 34,
          title: "Stuffed Bear",
          description: "Large teddy bear, super soft, perfect gift.",
          category: "Toys",
          price: 30,
          image: "bear1.png",
          userId: "sample",
          username: "PlushPals"
        },
        {
          id: Date.now() + 35,
          title: "Puzzle 1000 pieces",
          description: "Beautiful landscape puzzle for adults.",
          category: "Toys",
          price: 20,
          image: "puzzle1.png",
          userId: "sample",
          username: "PuzzleHut"
        },
        {
          id: Date.now() + 36,
          title: "Action Figures Set",
          description: "Superhero action figures collection, 6 pieces.",
          category: "Toys",
          price: 40,
          image: "figures1.png",
          userId: "sample",
          username: "HeroToys"
        },

        // Other (6 items)
        {
          id: Date.now() + 37,
          title: "Plant Pot Set",
          description: "Ceramic plant pots, set of 3 different sizes.",
          category: "Other",
          price: 35,
          image: "pots1.png",
          userId: "sample",
          username: "GardenLife"
        },
        {
          id: Date.now() + 38,
          title: "Wall Art Canvas",
          description: "Abstract modern art canvas, 24x36 inches.",
          category: "Other",
          price: 80,
          image: "art1.png",
          userId: "sample",
          username: "ArtGallery"
        },
        {
          id: Date.now() + 39,
          title: "Kitchen Utensils",
          description: "Complete kitchen utensil set with holder.",
          category: "Other",
          price: 40,
          image: "kitchen1.png",
          userId: "sample",
          username: "KitchenPro"
        },
        {
          id: Date.now() + 40,
          title: "Backpack",
          description: "Waterproof hiking backpack, 40L capacity.",
          category: "Other",
          price: 65,
          image: "backpack1.png",
          userId: "sample",
          username: "TravelGear"
        },
        {
          id: Date.now() + 41,
          title: "Guitar Acoustic",
          description: "Beginner acoustic guitar with case and picks.",
          category: "Other",
          price: 150,
          image: "guitar1.png",
          userId: "sample",
          username: "MusicShop"
        },
        {
          id: Date.now() + 42,
          title: "Tool Set",
          description: "Complete home tool set in carrying case.",
          category: "Other",
          price: 90,
          image: "tools1.png",
          userId: "sample",
          username: "ToolMaster"
        }
      ]
      setProducts(sampleProducts)
      setFilteredProducts(sampleProducts)
      localStorage.setItem('products', JSON.stringify(sampleProducts))
    }
  }, [])

  useEffect(() => {
    // Filter products based on search term and category
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory])

  const handleSearch = () => {
    // Search is handled by useEffect, this function is for the button click
    // The filtering happens automatically when searchTerm changes
  }

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  return (
    <div>
      <h2>Browse Products ({filteredProducts.length} items)</h2>
      
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      
      <div className="filter-container">
        <label>Category:</label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick && onProductClick(product)}
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p style={{ textAlign: 'center', color: '#718096', marginTop: '40px' }}>
          No products found. Try adjusting your search or filters.
        </p>
      )}
    </div>
  )
}

export default BrowseProducts