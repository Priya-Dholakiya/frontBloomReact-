import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';
import { getProducts, addProduct, updateProduct, deleteProduct, API_BASE } from '../../utils/productActions';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(`Load failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    fetch(`${API_BASE}/api/products`, { method: 'HEAD' })
      .then(() => setApiStatus('🟢 LIVE'))
      .catch(() => setApiStatus('🟡 Offline (localStorage)'));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      await loadProducts();
      setShowAddModal(false);
      setFormData({ title: '', price: '', description: '', category: '', image: '' });
    } catch (err) {
      setError(`Add failed: ${err.message}`);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct.id, formData);
      await loadProducts();
      setShowEditModal(false);
      setEditingProduct(null);
      setFormData({ title: '', price: '', description: '', category: '', image: '' });
    } catch (err) {
      setError(`Update failed: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch (err) {
        setError(`Delete failed: ${err.message}`);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description || '',
      category: product.category || '',
      image: product.image || ''
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <section className="products-section">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2>🛍️ Products Management</h2>
            <p><strong>API Status: {apiStatus}</strong></p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">
              ➕ Add Product
            </Button>
            <Button variant="info" onClick={loadProducts} className="ms-2">
              🔄 Refresh
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Preview</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id || index}>
                <td>{product?.id?.slice(-6) || 'N/A'}</td>
                <td>
                  <img src={product.image} alt={product.title} className="product-img" onError={(e) => {e.target.src='https://via.placeholder.com/80x80?text=No+Image';}} />
                </td>
                <td>{product.title}</td>
                <td><strong>${parseFloat(product.price).toFixed(2)}</strong></td>
                <td><Badge bg="secondary">{product.category}</Badge></td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(product)}>
                    ✏️ Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product?.id)}>
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {products.length === 0 && (
          <Alert variant="info">
            No products. Add via UI!
          </Alert>
        )}
      </Container>

      <Modal show={showAddModal || showEditModal} onHide={() => {
        setShowAddModal(false);
        setShowEditModal(false);
        setEditingProduct(null);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{showEditModal ? 'Edit' : 'Add'} Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={showEditModal ? handleEditProduct : handleAddProduct}>
          <Modal.Body>
            {showEditModal && (
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control value={editingProduct?.id || ''} disabled plaintext readOnly />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control name="title" value={formData.title} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price *</Form.Label>
              <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control name="category" value={formData.category} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" value={formData.image} onChange={handleInputChange} placeholder="https://fakestoreapi.com/img/..." />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setEditingProduct(null);
            }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {showEditModal ? '💾 Save' : '➕ Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </section>
  );
};

export default Products;                  

