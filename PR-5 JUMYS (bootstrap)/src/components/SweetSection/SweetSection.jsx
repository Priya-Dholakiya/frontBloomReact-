import { Container, Row, Col, Button } from "react-bootstrap";
import "./SweetSection.css";

function SweetSection() {
  return (
    <section className="sweet-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="main-heading">
              Make Every Day A <br /> Sweet Day
            </h1>

            <p className="sub-text">
              But Incorporating Liquor Into Ice Cream Seems Like
              Nothing When You Consider How Inventive...
            </p>

            <div className="features">
              <p>❄ Guaranteed Frozen Delivery</p>
              <p>🚚 Flat-Rate Shipping Nationwide</p>
              <p>📦 Instagram-Worthy Unboxing</p>
            </div>

            <Button className="view-btn">
              View More →
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SweetSection;