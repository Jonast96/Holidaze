import React from "react";
import Row from "react-bootstrap/Row";
import Images from "../venue/Images";
import Info from "../venue/Info";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function Preview(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);
  const owner = {
    name: user.name,
    avatar: user.avatar
      ? user.avatar
      : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  };
  return (
    <Container className="mt-5 mainContainer preview">
      <h2>Preview</h2>
      <Images media={props.media} />
      <Row>
        <Info
          payload={props.payload}
          name={props.name}
          maxGuests={props.maxGuests}
          description={props.description}
          owner={owner}
          meta={props.meta}
          location={props.location}
        />

        <Col
          sm={12}
          lg={4}
          id="booking"
          className="booking text-center border mt-4"
        >
          Booking will go here
        </Col>
      </Row>
    </Container>
  );
}
export default Preview;
