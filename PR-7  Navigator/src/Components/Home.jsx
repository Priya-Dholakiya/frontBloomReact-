import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container, Badge } from "react-bootstrap";
import { getStorageData, setStorageData } from "../services/storageData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getStorageData());
  }, []);

  const handleDelete = (id) => {
    const updatedData = products.filter((item) => item.id !== id);
    setProducts(updatedData);
    setStorageData(updatedData);
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center fw-bold">Product List</h3>

      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <Card className="border-0 shadow-sm h-100 rounded-3">
                {/* Image Section */}
                <div style={{ position: "relative" }}>
                  <Card.Img
                    src={product.image}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />

                  {/* Category Badge Overlay */}
                  <Badge
                    bg="dark"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {product.category}
                  </Badge>
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-semibold">
                    {product.title}
                  </Card.Title>

                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "14px" }}
                  >
                    {product.description}
                  </Card.Text>

                  <div className="mt-2 mb-2">
                    <span className="fw-bold text-primary fs-5">
                      ₹ {product.price}
                    </span>
                  </div>

                  <p style={{ fontSize: "14px" }}>
                    Qty: <strong>{product.quantity}</strong>
                  </p>

                  {/* Buttons */}
                  <div className="mt-auto">
                    <Button
                      variant="primary"
                      className="w-100 mb-2"
                      size="sm"
                      onClick={() => navigate(`/editproduct/${product.id}`)}
                    >
                      Update
                    </Button>

                    <Button
                      variant="danger"
                      className="w-100"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h5 className="text-center text-muted">No products found</h5>
        )}
      </Row>
    </Container>
  );
};

export default Home;
