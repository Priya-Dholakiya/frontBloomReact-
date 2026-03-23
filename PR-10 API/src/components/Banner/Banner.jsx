import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowRight, FaStar } from "react-icons/fa";
import shoe from "../../assets/image/imgi_1_photo-1542291026-7eec264c27ff.jpg";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <span className="badge-new">⚡ New Collection 2032</span>

            <h1 className="hero-title">
              Step Into <br />
              <span>Your Best</span>
            </h1>

            <p className="hero-text">
              Premium footwear for every step of your journey. From athletic
              performance to everyday comfort.
            </p>

            <div className="hero-buttons">
              <Button className="btn-main">
                Shop Now <FaArrowRight />
              </Button>

              <Button className="btn-outline">Browse Categories</Button>
            </div>
            <div className="hero-stats">
              <div>
                <h4>50K+</h4>
                <p>Happy Customers</p>
              </div>
              <div>
                <h4>
                  4.9 <FaStar className="star" />
                </h4>
                <p>Average Rating</p>
              </div>
              <div>
                <h4>300+</h4>
                <p>Styles Available</p>
              </div>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <div className="hero-img-wrapper">
              <img src={shoe} alt="shoe" className="hero-img" />
              <div className="discount-badge">
                UP TO <br /> 40% OFF
              </div>

              <div className="floating-box-left">
                ✔ Free Shipping <br />
                <small>Orders over $75</small>
              </div>

              <div className="floating-box-right">
                🔁 Easy Returns <br />
                <small>60-day guarantee</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
