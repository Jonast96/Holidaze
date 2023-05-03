import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import Login from "../auth/Login";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingConfirmationModal from "./BookingConfirmationModal";

function Booking(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBooking, setDisableBooking] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const bookings = props.data.bookings;
  console.log(bookings);

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
    return bookings.map((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);

      if (start > end) {
        return { start: end, end: start };
      } else {
        return { start, end };
      }
    });
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
        setErrorMessage("");
        setShowConfirmation(true);
      } else {
        setErrorMessage(json.message);
      }
    } catch (error) {
      console.error("Failed to book dates", error);
      setErrorMessage("Failed to book dates");
    }
  }

  return (
    <Col
      sm={12}
      lg={4}
      id="booking"
      className="booking text-center border mt-4"
    >
      <BookingConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        bookingData={{
          startDate,
          endDate,
          venue: props.data.name,
          price: props.data.price,
        }}
      />

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
      {user ? (
        <Button
          onClick={disableBooking ? null : handleBooking}
          className=" w-50 mb-3 fs-4"
        >
          Book now
        </Button>
      ) : (
        <Button className="me-2 w-100" onClick={() => setShowLogin(true)}>
          Login to book
        </Button>
      )}

      <Login show={showLogin} onHide={() => setShowLogin(false)} />
    </Col>
  );
}

export default Booking;
