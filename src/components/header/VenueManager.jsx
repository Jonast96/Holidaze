import Button from "react-bootstrap/Button";

export default function VenueManager(props) {
  return (
    <>
      <p>Logged in as venue manager</p>
      <Button onClick={props.logout} className="bg-danger border-danger">
        Log out
      </Button>
    </>
  );
}
