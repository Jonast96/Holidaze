import React from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";

function Info(props) {
  const amenities = [
    { key: "breakfast", label: "Breakfast" },
    { key: "parking", label: "Parking" },
    { key: "wifi", label: "Wifi" },
    { key: "pets", label: "Pets" },
  ];

  return (
    <>
      <Col sm={12} lg={7} className="">
        <h1 className="fw-semibold fs-3 mt-4">{props.data.name}</h1>
        <FontAwesomeIcon icon={faBed} /> {props.data.maxGuests} Beds
        <p>
          {props.data.location.city}, {props.data.location.country}
        </p>
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
        <div>
          <h3>Explore the location</h3>
        </div>
      </Col>
    </>
  );
}
export default Info;
