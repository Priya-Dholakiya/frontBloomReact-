import { Container, Row, Col } from "react-bootstrap";
import {
  FiTruck,
  FiRefreshCcw,
  FiCheckSquare,
  FiShield,
} from "react-icons/fi";
import "./Feature.css";

const featuresData = [
  {
    icon: <FiTruck />,
    title: "Free Shipping",
    desc: "Free standard shipping on all orders over $75. Express options available.",
  },
  {
    icon: <FiRefreshCcw />,
    title: "60-Day Returns",
    desc: "Changed your mind? Return unworn items within 60 days, no questions asked.",
  },
  {
    icon: <FiCheckSquare />,
    title: "Size Guarantee",
    desc: "Not the right fit? Exchange for a different size at no extra cost.",
  },
  {
    icon: <FiShield />,
    title: "Secure Checkout",
    desc: "Your payment information is encrypted and secure. Shop with confidence.",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <Container>
        <Row className="g-4">
          {featuresData.map((item, index) => (
            <Col lg={3} md={6} sm={12} key={index}>
              <div className="feature-box d-flex">
                <div className="icon-box">{item.icon}</div>

                <div className="ms-3">
                  <h6 className="feature-title">{item.title}</h6>
                  <p className="feature-desc">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;