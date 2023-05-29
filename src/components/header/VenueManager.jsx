import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

/**
 * The `VenueManager` functional component displays navigation options and controls for users that are logged in as venue managers.
 * It includes a link to the user's profile, a 'Log out' button, a link to the 'Home' page, and a link to create a new venue.
 *
 * @component
 *
 * @example
 * return (
 *   <VenueManager close={someFunction} logout={someOtherFunction} />
 * );
 *
 * @param {Object} props - The component's props.
 * @param {function} props.close - The function to call when closing the component.
 * @param {function} props.logout - The function to call when the user decides to log out.
 *
 * @returns {ReactElement} The `VenueManager` component for users that are logged in as venue managers.
 */
export default function VenueManager(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="host">
      <Nav.Link
        onClick={props.close}
        className="userInfo"
        as={Link}
        to={"/profile"}
      >
        <img
          src={
            user.avatar
              ? user.avatar
              : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
          }
          alt="Profile picture"
          className="rounded-circle img-fluid my-3"
        />
        <h5 className="text-center">{user.name}</h5>
      </Nav.Link>
      <Button onClick={props.logout} className="w-100">
        Log out
      </Button>
      <Nav.Link onClick={props.close} as={Link} to={"/"}>
        Home
      </Nav.Link>
      <Nav.Link onClick={props.close} as={Link} to={"/becomeHost"}>
        Host info
      </Nav.Link>
      <Nav.Link
        onClick={props.close}
        className="text-secondary"
        as={Link}
        to={"/createVenue"}
      >
        <FontAwesomeIcon icon={faAdd} /> Add a new venue
      </Nav.Link>
    </div>
  );
}
