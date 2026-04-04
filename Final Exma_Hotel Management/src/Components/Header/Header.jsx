import React, { useEffect } from "react";
import { Navbar, Nav, Button, Container, Dropdown, Badge } from "react-bootstrap";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../../Services/Action/AuthAction";
import { fetchBookingsAsync } from "../../Services/Action/MyBookingAction";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { bookings } = useSelector((state) => state.MybookingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchBookingsAsync(user.uid, false));
    }
  }, [user?.uid, dispatch]);

  const handleLogout = () => {
    dispatch(signOutAsync());
  };

  return (
    <div className="header-wrapper">
      <Navbar expand="lg" className="navbar-pill mx-auto">
        <Container>
          <Navbar.Brand href="/" className="dp-logo">
            DP
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="nav-menu" />

          <Navbar.Collapse id="nav-menu">
            <Nav className="mx-auto nav-menu">
              <Nav.Link as={Link} to="/book" className="nav-item position-relative">
                Bookings
                {Array.isArray(bookings) && bookings.length > 0 && (
                  <Badge pill bg="danger" className="booking-badge">
                    {bookings.length}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="user-dropdown" className="user-toggle">
                    <FaUserCircle />
                    {user.displayName || user.email.split('@')[0]}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/add-hotel">Add Hotel</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link as={Link} to="/sign-in">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
