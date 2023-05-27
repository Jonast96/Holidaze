import Button from "react-bootstrap/Button";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

/**
 * The `LoggedOut` functional component presents navigation options for users that are not logged in.
 * It includes links for 'Home', 'Browse venues', and 'Become a host', as well as buttons to 'Log in' or 'Sign up'.
 * It also uses the `Login` and `Register` components, which are modal dialogs for logging in and signing up, respectively.
 *
 * @component
 *
 * @example
 * return (
 *   <LoggedOut close={someFunction} />
 * );
 *
 * @param {Object} props - The component's props.
 * @param {function} props.close - The function to call when closing the component.
 *
 * @returns {ReactElement} The `LoggedOut` component for users that are not logged in.
 */
export default function LoggedOut(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <Nav.Link onClick={props.close} as={RouterLink} to={"/"}>
        Home
      </Nav.Link>
      <Nav.Link
        onClick={props.close}
        as={ScrollLink}
        to="featuredVenues"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        Browse venues
      </Nav.Link>
      <Nav.Link onClick={props.close} as={RouterLink} to={"/becomeHost"}>
        Become a host
      </Nav.Link>
      <div className=" mt-2  d-flex">
        <Button
          className="me-2 w-100"
          onClick={() => {
            setShowLogin(true);
            props.close;
          }}
        >
          Login
        </Button>
        <Button
          className="w-100"
          onClick={() => {
            setShowRegister(true);
            props.close;
          }}
        >
          Sign up
        </Button>
      </div>
      <Login
        close={props.close}
        show={showLogin}
        onHide={() => setShowLogin(false)}
      />
      <Register
        close={props.close}
        show={showRegister}
        onHide={() => setShowRegister(false)}
      />
    </>
  );
}
