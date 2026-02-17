import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./TastiestUpdates.css";

function TastiestUpdates() {
  const posts = [
    {
      id: 1,
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/articles/blog-7.jpg?v=1719804468",
      title: "The Best Ice Cream You'll Never Eat",
    },
    {
      id: 2,
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/articles/blog-5_900x.jpg?v=1719804408",
      title: "Fancy Figs? Make This Ice Cream",
    },
    {
      id: 3,
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/articles/blog-2_900x.jpg?v=1719804262",
      title: "The Art Of Crafting Gourmet Ice Cream",
    },
  ];

  return (
    <section className="updates-section">
      <Container>
        <h2 className="text-center main-title">Tastiest Updates</h2>

        <Row className="mt-5">
          {posts.map((post) => (
            <Col md={4} key={post.id} className="mb-4">
              <Card className="update-card">
                <div className="image-wrapper">
                  <Card.Img variant="top" src={post.image} />
                </div>

                <Card.Body>
                  <p className="meta-text">
                    BUSINESS TIPS <span className="dot">•</span> Jun 30, 2024
                  </p>
                  <Card.Title className="post-title">
                    {post.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Button className="read-btn">Read More</Button>
        </div>
      </Container>
    </section>
  );
}

export default TastiestUpdates;