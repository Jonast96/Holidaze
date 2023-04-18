import { Button } from "react-bootstrap";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";

export default function LoggedOut() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="#">Browse venue</Nav.Link>
      <Nav.Link href="venue">Become a host</Nav.Link>
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
