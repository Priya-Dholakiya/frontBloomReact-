import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import runImg from "../../assets/image/imgi_2_photo-1542291026-7eec264c27ff.jpg";
import sneakerImg from "../../assets/image/imgi_3_photo-1549298916-b41d501d3772.jpg";
import basketImg from "../../assets/image/imgi_4_photo-1579338559194-a162d19bf842.jpg";
import casualImg from "../../assets/image/imgi_5_photo-1525966222134-fcfa99b8ae77.jpg";
import bootsImg from "../../assets/image/imgi_6_photo-1638247025967-b4e38f787b76.jpg";
import sandalImg from "../../assets/image/imgi_7_photo-1603487742131-4160ec999306.jpg";
import "./shopCategory.css";

const categories = [
  {
    title: "Running",
    products: 48,
    desc: "Performance shoes built for speed and endurance",
    img: runImg,
  },
  {
    title: "Sneakers",
    products: 86,
    desc: "Classic and contemporary streetwear styles",
    img: sneakerImg,
  },
  {
    title: "Basketball",
    products: 32,
    desc: "Court-ready shoes with superior ankle support",
    img: basketImg,
  },
  {
    title: "Casual",
    products: 64,
    desc: "Everyday comfort meets effortless style",
    img: casualImg,
  },
  {
    title: "Boots",
    products: 28,
    desc: "Rugged style for any terrain",
    img: bootsImg,
  },
  {
    title: "Sandals",
    products: 24,
    desc: "Breathable comfort for warmer days",
    img: sandalImg,
  },
];
const ShopCategory = () => {
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
            <Col xs={12} md={6} lg={4} key={index} className="mb-4">
              <Card className="category-card">
                <div className="img-wrapper">
                  <Card.Img src={item.img} />
                </div>

                <div className="overlay">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
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
