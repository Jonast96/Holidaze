import Button from "react-bootstrap/Button";

export default function VenueManager(props) {
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
      <Nav.Link as={Link} to={"/"}>
        Home
      </Nav.Link>
    </div>
  );
}
