import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Form } from "react-bootstrap";
import EditModal from "./Modal";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";

function Info(props) {
  const amenities = [
    { key: "breakfast", label: "Breakfast" },
    { key: "parking", label: "Parking" },
    { key: "wifi", label: "Wifi" },
    { key: "pets", label: "Pets" },
  ];

  const position = [props.location.lat, props.location.lng];
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  const [venueData, setVenueData] = useState({
    ...props,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  };

  console.log(venueData);

  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  async function handleUpdateRequest() {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(venueData),
        }
      );

      const json = await response.json();

      console.log(json);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <EditModal
        show={show}
        handleClose={handleClose}
        body={
          <Form>
            <h4>Location data</h4>
            <Form.Group as={Col} controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={venueData.location.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={venueData.location.city}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="zip">
              <Form.Label>Zip</Form.Label>

              <Form.Control
                type="text"
                name="zip"
                value={venueData.location.zip}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={venueData.location.country}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="continent">
              <Form.Label>Continent</Form.Label>
              <Form.Control
                type="text"
                name="continent"
                value={venueData.location.continent}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lat">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                name="lat"
                value={venueData.location.lat}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lng">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                name="lng"
                value={venueData.location.lng}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        }
      />
      <Col sm={12} lg={7} className="">
        {user.name === props.owner.name ? (
          <div className="changeButtons ">
            <Button
              onClick={handleUpdateRequest}
              className="editBtn btn-secondary fw-light"
            >
              Save changes
            </Button>
            <Button className="deleteBtn fw-normal">Delete</Button>
          </div>
        ) : null}
        <h1 className="fw-semibold fs-3 mt-4">{props.name}</h1>
        <FontAwesomeIcon icon={faBed} /> {props.maxGuests} Beds
        <div className="d-flex">
          <div>
            {props.location.city}, {props.location.country}
          </div>
          {user.name === props.owner.name ? (
            <div onClick={handleShow} className="text-secondary ms-3">
              <FontAwesomeIcon icon={faEdit} /> Edit location
            </div>
          ) : null}
        </div>{" "}
        <a className="bookingLink btn btn-secondary mb-3" href="#booking">
          Take me to booking
        </a>
        <div className="d-flex flex-wrap gap-2 ">
          {amenities.map((amenity) => (
            <p
              key={amenity.key}
              className={`metaValues ${
                props.meta[amenity.key] ? "included" : "notIncluded"
              }`}
            >
              {amenity.label}
            </p>
          ))}
        </div>
        <p>{props.description}</p>
        {props.location.lat && props.location.lng ? (
          <div className="mb-4">
            <h3>Explore the location</h3>
            <MapContainer className="mapContainer" center={position} zoom={13}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{props.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : null}
        <div className="host bg-light p-2 rounded">
          <div className="d-flex align-items-center gap-2 mb-3">
            <img className="img-fluid" src={props.owner.avatar} alt="" />
            <h4>
              Meet your host,{" "}
              {props.owner.name.charAt(0).toUpperCase() +
                props.owner.name.slice(1)}
            </h4>
          </div>
          <p>
            Your host,{" "}
            {props.owner.name.charAt(0).toUpperCase() +
              props.owner.name.slice(1)}
            , is dedicated to ensuring that you have an unforgettable experience
            at {props.name}. Feel free to reach out to them via email at{" "}
            {props.owner.email} with any questions or concerns you may have
            during your stay.
          </p>
          <p>
            {props.location.city !== "Unknown" &&
            props.location.country !== "Unknown"
              ? `Book your stay at ${props.name} today and enjoy a memorable experience in ${props.city}, ${props.country}.`
              : `Book your stay at ${props.name} today and enjoy a memorable experience at our one-of-a-kind venue.`}
          </p>
        </div>
      </Col>
    </>
  );
}
export default Info;
