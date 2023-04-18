import Button from "react-bootstrap/Button";

export default function Guest(props) {
  return (
    <>
      <p>Logged in as guest</p>
      <Button onClick={props.logout} className="bg-danger border-danger">
        Log out
      </Button>
    </>
  );
}
