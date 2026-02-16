import { Container, Row, Col } from "react-bootstrap";
import "./FlavourSection.css";

function FlavorsSection() {
  const flavors = [
    {
      title: "Matcha",
      text: "Matcha Ice Cream Needs The Absolute Balance Between Sweetness, Fatness And Bitterness.",
      img: "https://wpbingo-jumys.myshopify.com/cdn/shop/files/banner-1.jpg?v=1714103883",
      bg: "#c8d9d0",
    },
    {
      title: "Strawberry",
      text: "The Main Ingredient Is Pureed Fresh Strawberries, Not Like Artificial Flavors.",
      img: "https://wpbingo-jumys.myshopify.com/cdn/shop/files/banner-2.jpg?v=1714615709",
      bg: "#e8c9cf",
    },
    {
      title: "Orange",
      text: "Sweet Taste Of Honey And Fresh Orange With Creamy Milk Texture.",
      img: "https://wpbingo-jumys.myshopify.com/cdn/shop/files/banner-3.jpg?v=1714615850",
      bg: "#e8dfc2",
    },
    {
      title: "Chocolate",
      text: "Rich Melted Chocolate Mixed With Fresh Milk And Butter.",
      img: "https://wpbingo-jumys.myshopify.com/cdn/shop/files/banner-4.jpg?v=1714616029",
      bg: "#d9c5af",
    },
  ];

  return (
    <section className="flavors-section py-5">
      <Container>
        <Row className="g-4">
          {flavors.map((item, index) => (
            <Col lg={3} md={6} key={index}className={index % 2 === 0 ? "card-down" : "card-up"}
            >
              <div
                className="flavor-card text-center p-4"
                style={{ background: item.bg }}
              >
                <div className="flavor-img-wrapper">
                  <img src={item.img} alt={item.title} />
                </div>

                <h3 className="flavor-title mt-3">{item.title}</h3>
                <p className="flavor-text">{item.text}</p>

                <div className="arrow-btn">›</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FlavorsSection;
