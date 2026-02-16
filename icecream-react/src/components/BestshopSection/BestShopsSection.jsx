import { Container, Row, Col, Button } from "react-bootstrap";
import "./BestshopSection.css";

function BestShopsSection() {
  return (
    <section className="best-shops-section">
      <Container>
        <Row className="align-items-start">
          {/* LEFT SIDE */}
          <Col lg={6}>
            <Row>
              <Col lg={6} md={6}>
                <h1 className="big-title">
                  Best <br />
                  Ice <br />
                  Cream <br />
                  Shops
                </h1>
              </Col>

              <Col lg={6} md={6} className="text-block">
                <p>
                  It’s Quite Possible That We Are Living In The Golden Age Of
                  Ice Cream Innovation. Old-School Creameries Are Churning Out
                  Vanilla Bean Masterpieces Honed Over Generations While New
                  Shops Are Tossing The Term “Chef”
                </p>
                <a href="#" className="read-more">
                  Read More
                </a>
              </Col>
            </Row>

            {/* LEFT dotted line */}
            <div className="bottom-line"></div>
          </Col>

          {/* RIGHT SIDE */}
          <Col lg={6}>
            <Row>
              <Col lg={6} md={6}>
                <h1 className="big-title">
                  Wave <br />
                  Artisan <br />
                  Shops
                </h1>
              </Col>

              <Col lg={6} md={6} className="text-block position-relative">
                <p>
                  These Ice Cream Shops Represent Everything That Is Well And
                  Good: New-Wave Artisan Shops Challenging The Very Notion Of
                  What Should Be Placed On A Cone (Or Stick, Or Between
                  Cookies), Old-School Parlors Learning…
                </p>
                <a href="#" className="read-more">
                  Read More
                </a>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                  alt="bucket"
                  className="small-icon"
                />
              </Col>
            </Row>

            {/* RIGHT dotted line */}
            <div className="bottom-line"></div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}


export default BestShopsSection;
