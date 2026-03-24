import React, { useState, useEffect } from "react";
import "./Category.css";
import { getCategories } from "../../utils/productActions";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="category">
        <div className="category-top">
          <h2>Shop by Category</h2>
          <p>Loading your categories...</p>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="category">
        <div className="category-top">
          <h2>Shop by Category</h2>
          <p>No categories yet. <a href="/products">Add products</a> with categories!</p>
        </div>
      </section>
    );
  }

  const firstCat = categories[0] || { title: 'Featured', products: 0, image: '/src/assets/image/imgi_1_photo-1542291026-7eec264c27ff.jpg' };
  const restCats = categories.slice(1).concat(Array(4 - Math.max(0, categories.length - 1)).fill({ title: 'New', products: 0, image: '/src/assets/image/download.svg' }));

  return (
    <section className="category">
      <div className="category-top">
        <h2>Shop by Category</h2>
        <p>Find the perfect footwear for every occasion and activity</p>
      </div>

      <div className="category-layout">

        {/* LEFT BIG CARD */}
        <div className="card big">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop" alt={firstCat.title} />
          <div className="content">
            <span className="tag">Explore</span>
            <h2>{firstCat.title}</h2>
            <p>{firstCat.products || 0} products available</p>
            <button>Shop Now →</button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          {restCats.slice(0,5).map((cat, index) => (
            <div key={index} className={`card small ${index === 4 ? 'wide' : ''}`}>
              <img src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&h=400&fit=crop" alt={cat.title} />
              <div className="content">
                <h4>{cat.title}</h4>
                <p>{cat.products || 0} products</p>
                <span>Shop Now →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
