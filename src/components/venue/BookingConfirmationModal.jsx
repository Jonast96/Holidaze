import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function BookingConfirmationModal({ show, onHide, bookingData }) {
  const { startDate, endDate, venue, price, guests } = bookingData;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Booking Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Thank you for your booking! Please review the details of your
          reservation below:
        </p>
        <p>
          <strong>Venue:</strong> {venue}
        </p>
        <p>
          {startDate ? (
            <>
              <strong>Check-in:</strong> {startDate.toLocaleDateString()}
            </>
          ) : (
            ""
          )}
        </p>
        <p>
          {endDate ? (
            <>
              <strong>Check-out:</strong> {endDate.toLocaleDateString()}
            </>
          ) : (
            ""
          )}
        </p>
        <p>
          <strong>Price:</strong> ${price.toFixed(2)} per night
        </p>
        <p>
          <strong>Guests:</strong> {guests}
        </p>
        <p>
          <strong>Total:</strong> $
          {(((endDate - startDate) / 86400000) * price).toFixed(2)}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingConfirmationModal;
