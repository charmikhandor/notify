import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbarcomp() {
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token", null);
    navigate("../login", { replace: true });
  };
  useEffect(() => {}, [location]);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Noteify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!sessionStorage.getItem("token") ? 
            <div>
              <Nav className="me-auto" activeKey={location.pathname}>
                <Nav.Link as={Link} eventKey="/" to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/about" to="/about">
                  About
                </Nav.Link>
              </Nav>
              <Button
                className="mx-2"
                as={Link}
                to="/login"
                variant="outline-primary"
              >
                Login
              </Button>
              <Button
                className="mx-1"
                as={Link}
                to="/signup"
                variant="outline-primary"
              >
                Sign-up
              </Button>
            </div>
           : 
            <div>
              <Nav className="me-auto" activeKey={location.pathname}>
                <Nav.Link as={Link} eventKey="/about" to="/about">
                  About
                </Nav.Link>
              </Nav>
              <Button
                className="mx-2"
                onClick={handleLogout}
                variant="outline-primary"
              >
                Logout
              </Button>
            </div>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarcomp;
