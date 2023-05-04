import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Form } from "react-bootstrap";
import EditModal from "./Modal";
import "leaflet/dist/leaflet.css";

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
  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationData({
      ...locationData,
      [name]: value,
    });
  };

  console.log(props);
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
                value={props.location.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={props.location.city}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="zip">
              <Form.Label>Zip</Form.Label>

              <Form.Control
                type="text"
                name="zip"
                value={props.location.zip}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={props.location.country}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="continent">
              <Form.Label>Continent</Form.Label>
              <Form.Control
                type="text"
                name="continent"
                value={props.location.continent}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lat">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                name="lat"
                value={props.location.lat}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lng">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                name="lng"
                value={props.location.lng}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        }
      />
      <Col sm={12} lg={7} className="">
        <h1 className="fw-semibold fs-3 mt-4">{props.name}</h1>
        <FontAwesomeIcon icon={faBed} /> {props.maxGuests} Beds
        {props.location.city}, {props.location.country}
        <div onClick={handleShow} className="d-flex align-items-center">
          <FontAwesomeIcon className="me-1" icon={faEdit} />
          <p className="m-0 p-0">Edit location</p>
        </div>
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
        {props.locationlat && props.locationlng ? (
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
