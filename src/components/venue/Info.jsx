import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Info(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const amenities = [
    { key: "breakfast", label: "Breakfast" },
    { key: "parking", label: "Parking" },
    { key: "wifi", label: "Wifi" },
    { key: "pets", label: "Pets" },
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBooking, setDisableBooking] = useState(false);

  const bookings = props.data.bookings;

  function isOverlapping(range1, range2) {
    return range1.start <= range2.end && range1.end >= range2.start;
  }

  const onChange = (dates) => {
    const [start, end] = dates;

    const blockedIntervals = getExcludedIntervals();

    const isBlocked = blockedIntervals.some((blockedInterval) =>
      isOverlapping(
        { start: start, end: end },
        { start: blockedInterval.start, end: blockedInterval.end }
      )
    );

    if (isBlocked) {
      setStartDate(start);
      setEndDate(end);
      setErrorMessage("Please don't overlap with existing bookings.");
      setDisableBooking(true);
    } else {
      setErrorMessage("");
      setStartDate(start);
      setEndDate(end);
      setDisableBooking(false);
    }
  };

  function getExcludedIntervals() {
    return bookings.map((booking) => ({
      start: new Date(booking.dateFrom),
      end: new Date(booking.dateTo),
    }));
  }

  async function handleBooking() {
    if (!startDate || !endDate) {
      setErrorMessage("Please select a date range.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          body: JSON.stringify({
            dateFrom: startDate.toISOString(),
            dateTo: endDate.toISOString(),
            guests: 1,
            venueId: props.data.id,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        alert("Booking successful!");
        setErrorMessage("");
      } else {
        setErrorMessage(json.message);
      }
    } catch (error) {
      console.error("Failed to book dates", error);
      setErrorMessage("Failed to book dates");
    }
  }

  return (
    <>
      <Row>
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
        <Col sm={12} lg={4} className="booking text-center border mt-4">
          <h2 className=" fs-3 mt-4">Select your dates</h2>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <DatePicker
            className=""
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            excludeDateIntervals={getExcludedIntervals()}
          />

          <p className="fs-5 price">${props.data.price},- per night</p>
          <div className="d-flex justify-content-center gap-4 align-items-center">
            <div>
              <p className="p-0 m-0">From</p>
              <p className="dates  m-0">{startDate.toLocaleDateString()}</p>
            </div>
            <FontAwesomeIcon size="xl" icon={faArrowCircleRight} />
            <div>
              <p className="p-0 m-0">To</p>
              <p className="dates  m-0">
                {endDate ? endDate.toLocaleDateString() : "Select date"}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <p className="price fs-4">
              Total:{" "}
              {endDate
                ? `$${(
                    ((endDate - startDate) / 86400000) *
                    props.data.price
                  ).toFixed(2)},-`
                : "0"}
            </p>
          </div>
          <button
            onClick={disableBooking ? null : handleBooking}
            className="btn btn-primary w-50 mb-3 fs-4"
          >
            Book now
          </button>
        </Col>
      </Row>
    </>
  );
}
export default Info;
