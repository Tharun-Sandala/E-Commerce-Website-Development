import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Plus, Minus, Filter, ChevronDown } from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  stock: number;
  brand: string;
  features: string[];
}

interface CartItem extends Product {
  quantity: number;
}

// Expanded product data with 50+ items
const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "High-quality wireless headphones with active noise cancellation",
    category: "Electronics",
    rating: 4.5,
    stock: 15,
    brand: "SoundMaster",
    features: ["Active Noise Cancellation", "Bluetooth 5.0", "Touch Controls", "Voice Assistant"]
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "Advanced smartwatch with health tracking features",
    category: "Electronics",
    rating: 4.8,
    stock: 10,
    brand: "TechWear",
    features: ["Heart Rate Monitor", "GPS", "Water Resistant", "ECG Sensor"]
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80",
    description: "55-inch 4K Smart TV with HDR",
    category: "Electronics",
    rating: 4.9,
    stock: 5,
    brand: "VisionTech",
    features: ["4K Resolution", "HDR Support", "Smart Hub", "Voice Control"]
  },
  {
    id: 4,
    name: "Gaming Laptop Pro",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
    description: "High-performance gaming laptop",
    category: "Electronics",
    rating: 4.8,
    stock: 3,
    brand: "GameMaster",
    features: ["RTX Graphics", "144Hz Display", "RGB Keyboard", "16GB RAM"]
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    description: "Professional gaming mouse with customizable buttons",
    category: "Electronics",
    rating: 4.7,
    stock: 20,
    brand: "GameMaster",
    features: ["16000 DPI", "Wireless", "RGB Lighting", "8 Programmable Buttons"]
  },

  // Sports Equipment
  {
    id: 6,
    name: "Professional Running Shoes",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    description: "High-performance running shoes",
    category: "Sports",
    rating: 4.6,
    stock: 20,
    brand: "SportFlex",
    features: ["Breathable Mesh", "Shock Absorption", "Anti-slip", "Lightweight"]
  },
  {
    id: 7,
    name: "Yoga Mat Premium",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&q=80",
    description: "Professional yoga mat with alignment marks",
    category: "Sports",
    rating: 4.7,
    stock: 25,
    brand: "YogaFlex",
    features: ["Eco-friendly", "Non-slip", "Alignment Marks", "Extra Thick"]
  },
  {
    id: 8,
    name: "Tennis Racket Pro",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1617083277624-481a0b78b8cf?w=500&q=80",
    description: "Professional grade tennis racket",
    category: "Sports",
    rating: 4.5,
    stock: 12,
    brand: "SportPro",
    features: ["Graphite Frame", "Mid Plus Head", "Strung", "Comfort Grip"]
  },
  {
    id: 9,
    name: "Basketball Elite",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&q=80",
    description: "Official size basketball",
    category: "Sports",
    rating: 4.6,
    stock: 30,
    brand: "SportPro",
    features: ["Official Size", "Premium Leather", "Superior Grip", "Indoor/Outdoor"]
  },
  {
    id: 10,
    name: "Cycling Helmet",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1557803175-2d5c024eb317?w=500&q=80",
    description: "Safety certified cycling helmet",
    category: "Sports",
    rating: 4.8,
    stock: 15,
    brand: "BikeGear",
    features: ["Lightweight", "Ventilated", "Adjustable Fit", "Safety Certified"]
  },

  // Fashion
  {
    id: 11,
    name: "Premium Leather Backpack",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    description: "Handcrafted leather backpack",
    category: "Fashion",
    rating: 4.7,
    stock: 8,
    brand: "LeatherCraft",
    features: ["Genuine Leather", "Laptop Pocket", "Water Resistant", "Anti-theft"]
  },
  {
    id: 12,
    name: "Designer Sunglasses",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    description: "Luxury polarized sunglasses",
    category: "Fashion",
    rating: 4.4,
    stock: 12,
    brand: "LuxeView",
    features: ["Polarized", "UV Protection", "Premium Case", "Lightweight"]
  },

  // Smart Home
  {
    id: 13,
    name: "Smart Speaker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80",
    description: "Voice-controlled smart speaker",
    category: "Smart Home",
    rating: 4.6,
    stock: 25,
    brand: "TechHome",
    features: ["Voice Control", "Multi-room Audio", "Smart Home Hub", "HD Sound"]
  },
  {
    id: 14,
    name: "Smart Thermostat",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1567925086888-5db4b7054f92?w=500&q=80",
    description: "Energy-saving smart thermostat",
    category: "Smart Home",
    rating: 4.8,
    stock: 15,
    brand: "TechHome",
    features: ["Energy Saving", "Remote Control", "Learning Algorithm", "Easy Install"]
  },

  // Fitness Equipment
  {
    id: 15,
    name: "Adjustable Dumbbells",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=500&q=80",
    description: "Space-saving adjustable dumbbells",
    category: "Fitness",
    rating: 4.7,
    stock: 10,
    brand: "FitPro",
    features: ["5-50 lbs Range", "Quick Adjust", "Compact Design", "Durable Build"]
  },
  {
    id: 16,
    name: "Rowing Machine",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1586205208101-79ffd2e21f8f?w=500&q=80",
    description: "Professional rowing machine",
    category: "Fitness",
    rating: 4.9,
    stock: 5,
    brand: "FitPro",
    features: ["Magnetic Resistance", "LCD Display", "Foldable", "Heart Rate Monitor"]
  },

  // Outdoor
  {
    id: 17,
    name: "Camping Tent",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80",
    description: "4-person waterproof tent",
    category: "Outdoor",
    rating: 4.6,
    stock: 8,
    brand: "OutdoorPro",
    features: ["Waterproof", "Easy Setup", "Ventilated", "Storage Pockets"]
  },
  {
    id: 18,
    name: "Hiking Backpack",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1622260614153-03223fb60a8f?w=500&q=80",
    description: "65L hiking backpack",
    category: "Outdoor",
    rating: 4.7,
    stock: 12,
    brand: "OutdoorPro",
    features: ["65L Capacity", "Rain Cover", "Multiple Compartments", "Padded Straps"]
  },

  // Photography
  {
    id: 19,
    name: "Mirrorless Camera",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    description: "Professional mirrorless camera",
    category: "Photography",
    rating: 4.8,
    stock: 7,
    brand: "PhotoPro",
    features: ["24MP Sensor", "4K Video", "WiFi", "Touch Screen"]
  },
  {
    id: 20,
    name: "Camera Tripod",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?w=500&q=80",
    description: "Professional camera tripod",
    category: "Photography",
    rating: 4.5,
    stock: 15,
    brand: "PhotoPro",
    features: ["Carbon Fiber", "Quick Release", "Ball Head", "Portable"]
  }
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId) {
          const product = products.find(p => p.id === productId);
          const newQuantity = Math.max(1, Math.min(item.quantity + delta, product?.stock || 1));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = products
    .filter(product =>
      (searchQuery === '' || 
       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === '' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
              <h1 className="text-xl font-bold text-gray-800">ShopHub</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2"
            >
              <ShoppingCart className="text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Filters and Sort */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative pb-[100%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-white px-2 py-1 rounded-full text-sm font-semibold shadow">
                    ★ {product.rating}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <span className="text-sm font-medium text-gray-500">{product.brand}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Key Features:</h4>
                  <ul className="text-sm text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <p className="text-sm text-gray-500">{product.stock} in stock</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      product.stock === 0
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Shopping Cart ({cartItemCount} items)</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 flex flex-col h-[calc(100vh-180px)] overflow-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingCart size={48} className="mb-4" />
                  <p className="text-lg">Your cart is empty</p>
                  <p className="text-sm">Add some products to get started!</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center py-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                className={`w-full py-3 rounded-lg transition-colors ${
                  cart.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;