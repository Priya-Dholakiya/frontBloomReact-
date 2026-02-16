import { Container, Row, Col, Card } from "react-bootstrap";
import "./summerSection.css";

function SummerSection() {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* Card 1 */}
        <Col md={4}>
          <Card className="summer-card border-0 text-white">
            <div className="img-wrapper">
              <Card.Img
                src="https://wpbingo-jumys.myshopify.com/cdn/shop/files/banner-1_165a7093-b857-41ec-8617-629d4cbbd871_540x.jpg?v=1719929469"
                alt="Summer"
              />
            </div>

            <Card.ImgOverlay className="overlay-text">
              <p className="small-text">hello</p>
              <h2 className="big-text">SUMMER!</h2>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col md={4}>
          <Card className="summer-card border-0 text-white">
            <div className="img-wrapper">
              <Card.Img
                src="https://wpbingo-jumys.myshopify.com/cdn/shop/files/banner-2_e4c406a0-0e93-42ec-8c56-3f013c3ce875_540x.jpg?v=1719929685"
                alt="Summer"
              />
            </div>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col md={4}>
          <Card className="summer-card border-0 text-white">
            <div className="img-wrapper">
              <Card.Img
                src="https://wpbingo-jumys.myshopify.com/cdn/shop/files/banner-3_0b74f0a0-fd76-43cd-8eff-00f01a954dbc_540x.jpg?v=1719929703"
                alt="Summer"
              />
            </div>

            <Card.ImgOverlay className="overlay-text">
              <h2 className="big-text">CREAMY</h2>
              <p className="small-text">enjoy</p>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SummerSection;
