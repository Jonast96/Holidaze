import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Guest(props) {
  //parse user from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="guest">
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
      <Nav.Link as={Link} to={"/"}>
        Home
      </Nav.Link>

      <Nav.Link as={Link} to={"/becomeHost"}>
        Become a host
      </Nav.Link>
    </div>
  );
}
