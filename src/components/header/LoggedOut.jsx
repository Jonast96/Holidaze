import { Button } from "react-bootstrap";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function LoggedOut() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <Nav.Link as={Link} to={"/"}>
        Home
      </Nav.Link>
      <Nav.Link as={Link} to={"/venue"}>
        Browse venue
      </Nav.Link>
      <Nav.Link as={Link} to={"/becomeHost"}>
        Become a host
      </Nav.Link>
      <div className=" mt-2  d-flex">
        <Button className="me-2 w-100" onClick={() => setShowLogin(true)}>
          Login
        </Button>
        <Button className="w-100" onClick={() => setShowRegister(true)}>
          Sign up
        </Button>
      </div>
      <Login show={showLogin} onHide={() => setShowLogin(false)} />
      <Register show={showRegister} onHide={() => setShowRegister(false)} />
    </>
  );
}