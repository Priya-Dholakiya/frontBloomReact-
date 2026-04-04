
import { Button, Card, Col, Container, Row, Spinner, Form, Badge, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRoomsAsync, deleteRoomAsync } from "../Services/Action/RoomAction";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useState, useMemo } from "react";
import "../App.css";

const Home = () => {
  const { rooms = [], loading } = useSelector((state) => state.RoomReducer);
  const { user, loading: authLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: '',
    bed: '',
    minPrice: '',
    maxPrice: ''
  });

  const categories = useMemo(() => [...new Set(rooms.map(r => r.category).filter(Boolean))], [rooms]);
  const beds = useMemo(() => [...new Set(rooms.map(r => r.bed).filter(Boolean))], [rooms]);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesCategory = !filters.category || room.category === filters.category;
      const matchesBed = !filters.bed || room.bed === filters.bed;
      const price = parseFloat(room.price) || 0;
      const minMatch = !filters.minPrice || price >= parseFloat(filters.minPrice);
      const maxMatch = !filters.maxPrice || price <= parseFloat(filters.maxPrice);
      return matchesCategory && matchesBed && minMatch && maxMatch;
    });
  }, [rooms, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      bed: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/sign-in");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(getAllRoomsAsync());
    }
  }, [dispatch, rooms.length]);

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await dispatch(deleteRoomAsync(id));
        toast.success("Room deleted!");
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-room/${id}`);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />

      <Container fluid className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3 text-gradient-gold">Premium Rooms Await</h1>
          <p className="lead text-muted mb-5 lh-lg">Find your perfect stay with smart filters - Filter by space, rent & category for the best match ✨</p>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4">
            <Col md={3}>
              <Card className="filter-sidebar h-100 sticky-top" style={{top: '20px'}}>
                <Card.Body className="p-4">
                  <h6 className="fw-bold mb-4 text-primary">Filters</h6>
                  
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Category</h6>
                    <Form.Select 
                      value={filters.category} 
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="mb-3"
                      size="sm"
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Bed Type (Space)</h6>
                    <Form.Select 
                      value={filters.bed} 
                      onChange={(e) => handleFilterChange('bed', e.target.value)}
                      className="mb-3"
                      size="sm"
                    >
                      <option value="">All Beds</option>
                      {beds.map(bed => (
                        <option key={bed} value={bed}>{bed} Bed</option>
                      ))}
                    </Form.Select>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Price Range (Rent)</h6>
                    <Form.Control 
                      type="number" 
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="mb-2"
                      size="sm"
                    />
                    <Form.Control 
                      type="number" 
                      placeholder="Max Price"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      size="sm"
                    />
                  </div>

                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="w-100"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>

                  <div className="mt-3 text-center">
                    <Badge bg="info">
                      {filteredRooms.length} rooms
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={9}>
              {filteredRooms.length > 0 ? (
                <Row className="g-4">
                  {filteredRooms.map((room) => (
                    <Col xs={12} sm={6} lg={6} key={room.id}>
<Card className="room-card-modern h-100 shadow-lg border-0 unique-room-card hotel-card" style={{borderRadius: '20px'}}>
                        <div className="position-relative overflow-hidden" style={{height: '250px'}}>
                          <Card.Img 
                            src={room.image}
                            alt={room.number}
                            className="w-100 h-100 object-fit-cover"
                            style={{transition: 'transform 0.4s ease'}}
                          />
                          <div className="position-absolute bottom-0 start-0 p-3">
                            <div className="bg-gradient-gold text-white p-2 rounded-pill shadow-sm">
                              <small className="fw-bold">₹{room.price}</small>
                              <small className="ms-1">/night</small>
                            </div>
                          </div>
                        </div>
                        <Card.Body className="p-4">
                          <h5 className="room-number fw-bold text-dark mb-2">{room.number}</h5>
                          <div className="d-flex gap-2 mb-3">
                            <Badge bg="secondary">{room.category}</Badge>
                            <Badge bg="info">{room.bed} Bed</Badge>
                          </div>
                          <p className="text-muted small mb-3 lh-sm">{room.desc}</p>
  <div className="d-flex gap-2 mt-3">
                            <Button variant="outline-primary" size="sm" className="flex-fill" onClick={() => handleUpdate(room.id)}>
                              <FaEdit />
                            </Button>
                            <Button variant="outline-danger" size="sm" className="px-3" onClick={() => handleDelete(room.id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-10">
                  <h4 className="text-muted">No rooms match your filters</h4>
                  <p className="text-muted">Try adjusting your search criteria</p>
                  <Button variant="outline-primary" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;
