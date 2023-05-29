// External dependencies
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

// Internal dependencies
import LoggedOut from "./LoggedOut";
import VenueManager from "./VenueManager";
import Guest from "./Guest";
import { UserContext } from "../Context";
import logo from "../../assets/media/logo.png";
import "./header.scss";

/**
 * The `Header` functional component renders the application's navigation bar. It displays a different
 * set of navigation links based on whether the user is logged in, and if they are, whether they are a guest
 * or a venue manager.
 *
 * @component
 *
 * @example
 * return (
 *   <Header />
 * );
 *
 * @returns {ReactElement} The `Header` component that serves as a global navigation bar for the application.
 */
function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const { user, setUser } = React.useContext(UserContext);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  useEffect(() => {
    const localStoredUser = JSON.parse(localStorage.getItem("user"));
    setUser(
      localStoredUser
        ? { loggedIn: true, venueManager: localStoredUser.isVenueManager }
        : { loggedIn: false, venueManager: false }
    );
  }, []);

  function logout() {
    setUser({ loggedIn: false, venueManager: false });
    localStorage.clear();
    window.location.href = "/";
  }

  const toggleOffcanvas = () => {
    setOffcanvasOpen(!offcanvasOpen);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(currentScrollPos < lastScrollPos || currentScrollPos === 0);
    setLastScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollPos]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        offcanvasOpen &&
        !e.target.closest(".navbar") &&
        !e.target.closest(".offcanvas") &&
        !e.target.closest(".modal")
      ) {
        setOffcanvasOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      if (handleDocumentClick) {
        document.removeEventListener("click", handleDocumentClick);
      }
    };
  }, [offcanvasOpen]);

  return (
    <header id="search">
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
            className="bg-secondary text-secondary"
            aria-controls="offcanvasNavbar-expand-lg"
            onClick={toggleOffcanvas}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
            className="bg-dark"
            show={offcanvasOpen}
          >
            <Offcanvas.Header
              className="btn-close-white"
              closeButton
              onClick={toggleOffcanvas}
            >
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
                    <VenueManager
                      logout={() => {
                        logout();
                        setOffcanvasOpen(false);
                      }}
                      close={() => setOffcanvasOpen(false)}
                    />
                  ) : (
                    <Guest
                      logout={() => {
                        logout();
                        setOffcanvasOpen(false);
                      }}
                      close={() => setOffcanvasOpen(false)}
                    />
                  )
                ) : (
                  <LoggedOut close={() => setOffcanvasOpen(false)} />
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
