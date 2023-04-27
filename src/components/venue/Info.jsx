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

  const position = [props.lat, props.lng];

  return (
    <>
      <Col sm={12} lg={7} className="">
        <h1 className="fw-semibold fs-3 mt-4">{props.name}</h1>
        <FontAwesomeIcon icon={faBed} /> {props.maxGuests} Beds
        <p>
          {props.city}, {props.country}
        </p>
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
        {props.lat && props.lng ? (
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
            {props.city !== "Unknown" && props.country !== "Unknown"
              ? `Book your stay at ${props.name} today and enjoy a memorable experience in ${props.city}, ${props.country}.`
              : `Book your stay at ${props.name} today and enjoy a memorable experience at our one-of-a-kind venue.`}
          </p>
        </div>
      </Col>
    </>
  );
}
export default Info;
