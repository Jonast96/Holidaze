import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "./Modal";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";

function Info(props) {
  const amenities = [
    { key: "breakfast", label: "Breakfast" },
    { key: "parking", label: "Parking" },
    { key: "wifi", label: "Wifi" },
    { key: "pets", label: "Pets" },
  ];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const position = [props.location.lat, props.location.lng];

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser) {
      setUser(localStorageUser);
    }
  }, []);

  return (
    <>
      <Col sm={12} lg={7} className="">
        <Modal
          show={show}
          handleClose={handleClose}
          body={
            <Form>
              <h4>Update location</h4>

              <Form.Group as={Col} controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={props.payload.location.address}
                  onChange={(e) => props.handleInputChange(e, "address")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={props.payload.location.city}
                  onChange={(e) => props.handleInputChange(e, "city")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="continent">
                <Form.Label>Continent</Form.Label>
                <Form.Control
                  type="text"
                  name="continent"
                  value={props.payload.location.continent}
                  onChange={(e) => props.handleInputChange(e, "continent")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={props.payload.location.country}
                  onChange={(e) => props.handleInputChange(e, "country")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="lat">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  name="lat"
                  step="0.000001"
                  value={props.payload.location.lat}
                  onChange={(e) => props.handleInputChange(e, "lat")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="lng">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  name="lng"
                  step="0.000001"
                  value={props.payload.location.lng}
                  onChange={(e) => props.handleInputChange(e, "lng")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="zip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={props.payload.location.zip}
                  onChange={(e) => props.handleInputChange(e, "zip")}
                />
              </Form.Group>
            </Form>
          }
        />
        <h1 className="fw-semibold fs-3 mt-4">{props.name}</h1>
        <FontAwesomeIcon icon={faBed} /> {props.maxGuests} Beds
        {user && user.name === props.owner.name ? (
          <div onClick={handleShow}>
            <FontAwesomeIcon className="fs-4 text-secondary" icon={faEdit} />{" "}
            Edit info details
          </div>
        ) : null}
        <div className="d-flex">
          <div>
            {props.location.city}, {props.location.country}
          </div>
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
