import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Guest(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="guest">
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
      <Button
        onClick={() => {
          props.logout();
          props.close;
        }}
        className="w-100"
      >
        Log out
      </Button>
      <Nav.Link onClick={props.close} as={Link} to={"/"}>
        Home
      </Nav.Link>

      <Nav.Link onClick={props.close} as={Link} to={"/becomeHost"}>
        Become a host
      </Nav.Link>
    </div>
  );
}
