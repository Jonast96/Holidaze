//External dependencies
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

// Internal dependencies
import LoggedOut from "./LoggedOut";
import logo from "../..//assets/media/logo.png";
import { UserContext } from "../Context";
import VenueManager from "./VenueManager";
import Guest from "./Guest";
import "./header.scss";
import { Link } from "react-router-dom";
/**
 * `Header` is a functional React component that displays the website header with navigation menu.
 * The header hides when the user scrolls down and shows when the user scrolls up.
 *
 * @returns {ReactElement} The rendered `Header` component.
 */

function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const { user, setUser } = React.useContext(UserContext);

  useEffect(() => {
    const localStoredUser = JSON.parse(localStorage.getItem("user"));
    console.log(localStoredUser);
    setUser(
      localStoredUser
        ? { loggedIn: true, venueManager: localStoredUser.venueManager }
        : { loggedIn: false, venueManager: false }
    );
  }, []);

  function logout() {
    setUser({ loggedIn: false, venueManager: false });
    localStorage.clear();
  }

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(currentScrollPos < lastScrollPos || currentScrollPos === 0);
    setLastScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);
  return (
    <header>
      <Navbar
        bg="dark"
        expand="xxxl"
        className={`mb-3 p-3 navbar-transition ${
          !visible ? "hidden-navbar" : ""
        }`}
        fixed="top"
      >
        <Container>
          <Navbar.Brand
            className="text-secondary fw-bold fs-3"
            as={Link}
            to={"/"}
          >
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
            <Offcanvas.Header className="btn-close-white" closeButton>
              <Offcanvas.Title
                className=" fs-3 fw-bold"
                id="offcanvasNavbarLabel-expand-lg "
              >
                Holidaze
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 text-light fs-5">
                {user.loggedIn ? (
                  user.venueManager ? (
                    <VenueManager logout={() => logout()} />
                  ) : (
                    <Guest logout={() => logout()} />
                  )
                ) : (
                  <LoggedOut />
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
