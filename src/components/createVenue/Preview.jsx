import React from "react";
import Row from "react-bootstrap/Row";
import Images from "../venue/Images";
import Info from "../venue/Info";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function Preview(props) {
  const owner = {
    name: "John Doe",
    avatar: "",
  };
  return (
    <Container className="mt-5 mainContainer preview">
      <h2>Preview</h2>
      <Images media={props.data.media} />
      <Row>
        <Info
          name={props.data.name}
          maxGuests={props.data.maxGuests}
          city={props.data.location.city}
          country={props.data.location.country}
          description={props.data.description}
          lat={props.data.location.lat}
          lng={props.data.location.lng}
          owner={owner}
          meta={props.data.meta}
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
