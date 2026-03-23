import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import user1 from "../../assets/image/user1.jpg";
import user2 from "../../assets/image/user2.jpg";
import user3 from "../../assets/image/user3.jpg";
import "./Testimonials.css";

const testimonials = [
  {
    text: "Stride has completely transformed my running experience. The Velocity Runner Pro helped me PR at my last marathon by 8 minutes.",
    name: "Marcus Chen",
    role: "Marathon Runner",
    img: user1, 
  },
  {
    text: "I wear Stride shoes for all my classes. They are versatile, stylish, and my feet never hurt after a long day of training.",
    name: "Emily Rodriguez",
    role: "Fitness Instructor",
    img: user2,
  },
  {
    text: "The quality and attention to detail is unmatched. Stride has become my go-to brand.",
    name: "David Kim",
    role: "Sneaker Enthusiast",
    img: user3,
  },
];

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "4.9/5", label: "Average Rating" },
  { number: "15K+", label: "5-Star Reviews" },
  { number: "98%", label: "Would Recommend" },
];

const Testimonials = () => {
  return (
    <section className="testimonial-section">
      <Container>
        <Row className="g-4">
          {testimonials.map((item, index) => (
            <Col lg={4} md={6} sm={12} key={index}>
              <Card className="testimonial-card h-100">
                <Card.Body>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="review-text">"{item.text}"</p>
                  <div className="user-info">
                    <img
                      src={item.img || "/placeholder.png"}
                      alt={item.name}
                    />
                    <div>
                      <h6>{item.name}</h6>
                      <span>{item.role}</span>
                    </div>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="divider"></div>
        <Row className="stats text-center">
          {stats.map((stat, index) => (
            <Col md={3} xs={6} key={index} className="stat-item">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
};

export default Testimonials;