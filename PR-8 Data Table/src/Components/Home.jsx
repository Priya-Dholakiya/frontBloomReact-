import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Badge,
  Form,
} from "react-bootstrap";
import { getStorageData, setStorageData } from "../services/storageData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStorageData();
    setProducts(data);
    setFilteredProducts(data);
  }, []);

  // DELETE
  const handleDelete = (id) => {
    const updatedData = products.filter((item) => item.id !== id);
    setProducts(updatedData);
    setFilteredProducts(updatedData);
    setStorageData(updatedData);
  };

  // SORT
  const handleSort = (order) => {
    setSortOrder(order);

    let updated = [...filteredProducts];

    if (order === "asc") {
      updated.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
    setCurrentPage(1);
  };

  // FILTER
  const handleFilter = (category) => {
    setCategoryFilter(category);

    let updated =
      category === ""
        ? products
        : products.filter((item) => item.category === category);

    setFilteredProducts(updated);
    setCurrentPage(1);
  };

  // RESET ALL (Main Back Button)
  const handleReset = () => {
    setFilteredProducts(products);
    setSortOrder("");
    setCategoryFilter("");
    setCurrentPage(1);
  };

  // PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <Container className="py-4">
      {/* CONTROL PANEL */}
      <Card className="p-3 mb-4 shadow border-0 rounded-4">
        <Row className="align-items-center">
          <Col md={3}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Grocery">Grocery</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort By Price</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Badge bg="dark" className="p-2">
              Total: {filteredProducts.length}
            </Badge>
          </Col>

          <Col md={3} className="text-end">
            {(sortOrder || categoryFilter) && (
              <Button variant="outline-danger" size="sm" onClick={handleReset}>
                ← Back / Clear All
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      {/* PRODUCT LIST */}
      <Row>
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <Card className="custom-card h-100">
                <div className="image-wrapper">
                  <Card.Img src={product.image} />
                </div>

                <Card.Body className="d-flex flex-column">
                  <h5>{product.title}</h5>
                  <p className="category">{product.category}</p>
                  <p className="text-muted">{product.description}</p>
                  <div className="price">₹ {product.price}</div>
                  <div className="stock mb-3">Qty: {product.quantity}</div>

                  <div className="button-group mt-auto">
                    <Button
                      className="btn-edit"
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                    >
                      Update
                    </Button>

                    <Button
                      className="btn-delete"
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

      {/* PAGINATION */}
      <div className="text-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "warning" : "outline-dark"}
            className="me-2"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default Home;
