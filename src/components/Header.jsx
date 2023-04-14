import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button } from "react-bootstrap";
import logo from ".././assets/media/logo.png";
function OffcanvasExample() {
  return (
    <header>
      <Navbar bg="dark" expand="xxxl" className="mb-3 p-3">
        <Container>
          <Navbar.Brand className="text-secondary fw-bold fs-3" href="/">
            <img src={logo} alt="" />
            Holidaze
          </Navbar.Brand>
          <Navbar.Toggle
            className="bg-secondary text-secondary "
            aria-controls="offcanvasNavbar-expand-lg"
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
            className="bg-dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                className="text-secondary fs-3 fw-bold"
                id="offcanvasNavbarLabel-expand-lg "
              >
                Holidaze
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 text-secondary fs-5">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#">Browse venue</Nav.Link>
                <Nav.Link href="venue">Become a host</Nav.Link>
                <div className="d-flex gap-2 mt-2">
                  <Button>Login</Button>
                  <Button>Sign up</Button>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}

export default OffcanvasExample;
