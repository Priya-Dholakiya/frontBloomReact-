import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsLightningChargeFill } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="newsletter-section py-4">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h5 className="fw-bold mb-1">Join the Stride Club</h5>
              <p className="mb-0">
                Get 15% off your first order, plus early access to new drops.
              </p>
            </Col>
            <Col lg={6} className="mt-3 mt-lg-0 d-flex justify-content-lg-end">
              <Form className="d-flex gap-2">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                />
                <Button className="subscribe-btn px-4">
                  Subscribe
                </Button>
              </Form>
            </Col>

          </Row>
        </Container>
      </div>
      <Container className="py-5">
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <div className="logo-icon me-2">
                <BsLightningChargeFill />
              </div>
              <h5 className="fw-bold m-0">Stride</h5>
            </div>

            <p>
              Premium footwear for every step of your journey. From athletic
              performance to everyday comfort.
            </p>

            <div className="social-icons d-flex gap-3 mt-3">
              <FaInstagram />
              <FaFacebookF />
              <FaXTwitter />
              <FaYoutube />
              <FaTiktok />
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold">Shop</h6>
            <ul className="footer-links">
              <li>Running</li>
              <li>Sneakers</li>
              <li>Basketball</li>
              <li>Casual</li>
              <li>Boots</li>
              <li>Sandals</li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold">Help</h6>
            <ul className="footer-links">
              <li>FAQ</li>
              <li>Shipping & Returns</li>
              <li>Size Guide</li>
              <li>Contact Us</li>
              <li>Track Order</li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold">About</h6>
            <ul className="footer-links">
              <li>Our Story</li>
              <li>Sustainability</li>
              <li>Athletes</li>
              <li>Careers</li>
              <li>Store Locator</li>
            </ul>
          </Col>

        </Row>
      </Container>

      <div className="footer-bottom py-3">
        <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          
          <p className="mb-2 mb-md-0">
            © 2026 Stride. All rights reserved.
          </p>

          <div className="d-flex gap-3">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>

        </Container>
      </div>

    </footer>
  );
};

export default Footer;