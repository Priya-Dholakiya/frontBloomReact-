import { useState } from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import "./HeroSlider.css";

const slides = [
  {
    id: "01",
    title1: "Ice Cream Heaven,",
    title2: "Cool Confections:",
    title3: "Discover the Magic",
    title4: "of Ice Cream",
    image: "https://wpbingo-jumys.myshopify.com/cdn/shop/files/bg-slider-2_3fa8b71c-4ff1-4e13-a827-3e2230c6e0d9.jpg?v=1719905136",
  },
  {
    id: "02",
    title1: "Sweet Frozen",
    title2: "Summer Treats:",
    title3: "Taste the Chill",
    title4: "of Happiness",
    image:
      "https://wpbingo-jumys.myshopify.com/cdn/shop/files/bg-slider-2_3fa8b71c-4ff1-4e13-a827-3e2230c6e0d9.jpg?v=1719905136",
  },
  {
    id: "03",
    title1: "Creamy Delights,",
    title2: "Frozen Dreams:",
    title3: "Enjoy Every Scoop",
    title4: "with Love",
    image: "https://wpbingo-jumys.myshopify.com/cdn/shop/files/bg-slider-2_3fa8b71c-4ff1-4e13-a827-3e2230c6e0d9.jpg?v=1719905136",
  },
];

function HeroSlider(){
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      controls={false}
      indicators={false}
      interval={3000}
      fade
    >
      {slides.map((slide, i) => (
        <Carousel.Item key={i}>
          <div
            className="hero-section"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <Container>
              <Row className="align-items-center">
                <Col md={6} className="hero-left">
                  <div key={index} className="text-animate">
                    <h1>
                      {slide.title1} <br/>
                      {slide.title2} <br/>
                      {slide.title3} <br/>
                      {slide.title4}
                    </h1>

                    <div className="hero-buttons">
                      <Button className="btn-red">Shop Now</Button>
                      <Button className="btn-red">
                        See More
                      </Button>
                    </div>

                    <div className="slide-number">
                      {slide.id}
                      <div className="underline"></div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroSlider;