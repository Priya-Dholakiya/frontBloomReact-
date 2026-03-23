import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./CTA.css";

const CTA = () => {
  return (
    <section className="cta-section">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h2 className="cta-title">
              Ready to Step Up Your Game?
            </h2>

            <p className="cta-subtitle">
              Join the Stride community and get 15% off your first order.
              Plus, early access to new releases and exclusive deals.
            </p>
            <Form className="cta-form d-flex justify-content-center">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="cta-input"
              />
              <Button className="cta-btn">
                Get 15% Off
              </Button>
            </Form>

            <p className="cta-note">
              No spam, ever. Unsubscribe anytime.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CTA;