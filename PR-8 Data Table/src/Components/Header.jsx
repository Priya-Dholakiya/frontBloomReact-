import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router";

const Header = ()  =>{
  return (
    <>
        <Navbar className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/"> Blinkit </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Link to={"/add-product"} className="btn btn-warning">Add Product</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  );
}

export default Header;
