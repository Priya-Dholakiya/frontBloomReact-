import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../../utils/productActions';
import "./Sale.css";

const Sale = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sort, setSort] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(['All Products', ...cats.map(c => c.title)]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(p => 
    selectedCategory === 'All Products' || p.category === selectedCategory
  ).sort((a, b) => {
    const aNum = parseFloat(a.price);
    const bNum = parseFloat(b.price);
    if (sort === 'low-high') return aNum - bNum;
    if (sort === 'high-low') return bNum - aNum;
    return 0;
  });

  const addToCart = (product) => {
    const discount = 25 + Math.random() * 25; // 25-50% sale discount
    setCart([...cart, { ...product, salePrice: parseFloat(product.price) * (1 - discount/100) }]);
    alert(`${product.title} added to cart at sale price!`);
  };

  if (loading) return (
    <div className="sale-container">
      <div className="loading">Loading sale deals...</div>
    </div>
  );

  return (
    <div className="sale-container">
      {/* HEADER */}
      <div className="sale-hero">
        <h1>🔥 Massive Sale - Up to 50% Off!</h1>
        <p>Limited time - stock running low. Shop your favorites now!</p>
      </div>

      {/* FILTERS & CONTROLS */}
      <div className="sale-controls">
        <div className="left-controls">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-filter">
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat} ({products.filter(p => p.category === cat).length})</option>
            ))}
          </select>
          
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-filter">
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
        <div className="right-controls">
          <span className="item-count">{filteredProducts.length} items</span>
          <button className="clear-filters" onClick={() => {
            setSelectedCategory('All Products');
            setSort('featured');
          }}>Clear Filters</button>
        </div>
      </div>

      {/* SALE PRODUCTS GRID */}
      <div className="sale-grid">
        {filteredProducts.map((product) => {
          const originalPrice = parseFloat(product.price);
          const discount = 25 + Math.random() * 25;
          const salePrice = originalPrice * (1 - discount / 100);
          const tag = discount > 40 ? 'SUPER SALE' : discount > 30 ? 'HOT DEAL' : 'SALE';

          return (
            <div key={product.id} className="sale-card">
              <div className="sale-badge" style={{ '--bg-color': tag === 'SUPER SALE' ? '#ff4444' : tag === 'HOT DEAL' ? '#ffaa00' : '#00aa88' }}>
                {tag} -{Math.round(discount)}% OFF
              </div>
              <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=1000&fit=crop" alt={product.title} className="product-img" />
              <div className="sale-info">
                <h3>{product.title}</h3>
                <div className="price-section">
                  <span className="sale-price">${salePrice.toFixed(0)}</span>
                  <span className="original-price">${originalPrice.toFixed(0)}</span>
                </div>
                <div className="rating">
                  ★★★★☆ (12)
                </div>
                <div className="quick-actions">
                  <button className="add-cart" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="quick-view">
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CART SUMMARY */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>{cart.length} items in cart - Total savings: ${(cart.reduce((sum, item) => sum + (parseFloat(item.price) - item.salePrice), 0)).toFixed(0)}</h3>
          <button className="checkout-btn">Checkout Now</button>
        </div>
      )}
    </div>
  );
};

export default Sale;
