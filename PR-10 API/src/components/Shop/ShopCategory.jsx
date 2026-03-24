import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { getCategories } from '../../utils/productActions';
import "./ShopCategory.css";


const ShopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Container><p>Loading categories...</p></Container>;
  if (categories.length === 0) return <Container><p>No categories yet. Add products!</p></Container>;

  return (
    <section className="category-section">
      <Container>
        <div className="section-header">
          <div>
            <h2>Shop by Category</h2>
            <p>Find the perfect pair for every occasion</p>
          </div>

          <a href="#" className="view-all">
            View All →
          </a>
        </div>

        <Row>
          {categories.map((item, index) => (
            <Col xs={12} md={6} lg={4} key={item.title || index} className="mb-4">
              <Card className="category-card">
                <div className="img-wrapper">
                  <Card.Img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519" alt={item.title} />
                </div>

                <div className="overlay">
                  <h4>{item.title}</h4>
                  <p>{item.products} products • Perfect for {item.title.toLowerCase()}</p>
                  <span className="shop-link">Shop Now →</span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ShopCategory;
