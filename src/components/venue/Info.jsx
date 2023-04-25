import React from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

function Info(props) {
  const amenities = [
    { key: "breakfast", label: "Breakfast" },
    { key: "parking", label: "Parking" },
    { key: "wifi", label: "Wifi" },
    { key: "pets", label: "Pets" },
  ];

  const position = [props.data.location.lat, props.data.location.lng];

  return (
    <>
      <Col sm={12} lg={7} className="">
        <h1 className="fw-semibold fs-3 mt-4">{props.data.name}</h1>
        <FontAwesomeIcon icon={faBed} /> {props.data.maxGuests} Beds
        <p>
          {props.data.location.city}, {props.data.location.country}
        </p>
        <a className="bookingLink btn btn-secondary mb-3" href="#booking">
          Take me to booking
        </a>
        <div className="d-flex flex-wrap gap-2 ">
          {amenities.map((amenity) => (
            <p
              key={amenity.key}
              className={`metaValues ${
                props.data.meta[amenity.key] ? "included" : "notIncluded"
              }`}
            >
              {amenity.label}
            </p>
          ))}
        </div>
        <p>{props.data.description}</p>
        {props.data.location.lat && props.data.location.lng ? (
          <div className="mb-4">
            <h3>Explore the location</h3>
            <MapContainer className="mapContainer" center={position} zoom={13}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{props.data.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : null}
        <div className="host bg-light p-2 rounded">
          <div className="d-flex align-items-center gap-2 mb-3">
            <img className="img-fluid" src={props.data.owner.avatar} alt="" />
            <h4>
              Meet your host,{" "}
              {props.data.owner.name.charAt(0).toUpperCase() +
                props.data.owner.name.slice(1)}
            </h4>
          </div>
          <p>
            Your host,{" "}
            {props.data.owner.name.charAt(0).toUpperCase() +
              props.data.owner.name.slice(1)}
            , is dedicated to ensuring that you have an unforgettable experience
            at {props.data.name}. Feel free to reach out to them via email at{" "}
            {props.data.owner.email} with any questions or concerns you may have
            during your stay.
          </p>
          <p>
            {props.data.location.city !== "Unknown" &&
            props.data.location.country !== "Unknown"
              ? `Book your stay at ${props.data.name} today and enjoy a memorable experience in ${props.data.location.city}, ${props.data.location.country}.`
              : `Book your stay at ${props.data.name} today and enjoy a memorable experience at our one-of-a-kind venue.`}
          </p>
        </div>
      </Col>
    </>
  );
}
export default Info;
