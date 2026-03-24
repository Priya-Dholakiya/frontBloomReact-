import "./Header.css";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingBag, FiMoon } from "react-icons/fi";
import { FaBolt } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="topbar text-center py-2">
        Free shipping on orders over $75 | Use code
        <strong> STRIDE20 </strong> for 20% off your first order
      </div>
      <Navbar expand="lg" className="shadow-sm bg-white py-3">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
            <span className="logo-icon">
              <FaBolt />
            </span>
            Stride
          </Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse>
<Nav className="mx-auto gap-4">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
              <Nav.Link as={Link} to="/sale">Sale</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3 fs-5">
              {/* <Link to="/add" className="btn btn-primary add-product-btn">
                Add product
              </Link> */}
              <FiSearch className="nav-icon" />

              <FiMoon className="nav-icon" />

              <FiHeart className="nav-icon" />

              <div className="position-relative">
                <FiShoppingBag className="nav-icon" />
                <Badge bg="danger" pill className="cart-badge"></Badge>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
