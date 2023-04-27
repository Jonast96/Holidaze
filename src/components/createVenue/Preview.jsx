import React from "react";
import Row from "react-bootstrap/Row";
import Images from "../venue/Images";
import Info from "../venue/Info";
import "../venue/venue.scss";

function Preview(props) {
  const owner = {
    name: "John Doe",
    avatar: "", // Add a default avatar or a placeholder image URL here.
  };
  return (
    <div className="preview">
      <h2>Preview</h2>

      <Images media={props.data.mediaUrls} />
      <Row>
        <Info
          name={props.data.name}
          maxGuests={props.data.maxGuests}
          city={props.data.location.city}
          country={props.data.location.country}
          description={props.data.description}
          lat={props.data.location.latitude}
          lng={props.data.location.longitude}
          owner={owner}
          meta={props.data.amenities}
        />
      </Row>
    </div>
  );
}
export default Preview;
