import { useEffect, useState } from "react";
import { Button, Form, Col, Container, Row, Card } from "react-bootstrap";
import { getStorageData, setStorageData } from "../services/storageData";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    quantity: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = getStorageData();

    let updatedData = data.map((prod) =>
      prod.id === id ? { ...formData, id } : prod
    );

    setStorageData(updatedData);
    navigate("/");
  };

  useEffect(() => {
    let data = getStorageData();
    let record = data.find((prod) => prod.id === id);
    if (record) {
      setFormData(record);
    }
  }, [id]);

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4 rounded-4">
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold">
                Edit Product
              </h3>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Snacks">Snacks</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/")}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    variant="warning"
                    className="px-4 fw-bold rounded-pill"
                  >
                    Update Product
                  </Button>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;