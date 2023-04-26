import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function VenueManager(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="host">
      <Nav.Link className="userInfo" as={Link} to={"/profile"}>
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
      <Nav.Link as={Link} to={"/addVenue"}>
        Home
      </Nav.Link>
      <Nav.Link className="text-secondary" as={Link} to={"/createVenue"}>
        <FontAwesomeIcon icon={faAdd} /> Add a new venue
      </Nav.Link>
    </div>
  );
}
