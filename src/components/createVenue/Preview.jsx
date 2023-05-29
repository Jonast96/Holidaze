import React from "react";
import Row from "react-bootstrap/Row";
import Images from "../venue/Images";
import Info from "../venue/Info";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

/**
 * The `Preview` functional component is a page layout to display a preview
 * including images and information about a venue, a user profile, and a placeholder
 * for a booking feature.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.media - An array of media URLs.
 * @param {Object} props.payload - The payload data.
 * @param {string} props.name - The name of the venue.
 * @param {number} props.maxGuests - The maximum number of guests the venue can accommodate.
 * @param {string} props.description - The description of the venue.
 * @param {Object} props.meta - The meta data.
 * @param {Object} props.location - The location data.
 *
 * @example
 * const media = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"];
 * const payload = { ... };
 * const name = "Best Venue";
 * const maxGuests = 100;
 * const description = "This is the best venue.";
 * const meta = { ... };
 * const location = { ... };
 * return (
 *   <Preview media={media} payload={payload} name={name} maxGuests={maxGuests} description={description} meta={meta} location={location} />
 * );
 *
 * @returns {ReactElement} The `Preview` component, a page layout to display a preview.
 */
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
