import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/**
 * `BookingConfirmationModal` is a React component that displays a modal window with
 * confirmation details of a booking.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.show - Determines whether the modal is visible or not.
 * @param {Function} props.onHide - Function to be called when the modal is requested to be hidden.
 * @param {Object} props.bookingData - The data of the confirmed booking.
 * @param {Date} props.bookingData.startDate - The check-in date.
 * @param {Date} props.bookingData.endDate - The check-out date.
 * @param {string} props.bookingData.venue - The name of the booked venue.
 * @param {number} props.bookingData.price - The price per night.
 * @param {number} props.bookingData.guests - The number of guests.
 *
 * @example
 * return (
 *   <BookingConfirmationModal show={modalVisibility} onHide={hideModal} bookingData={confirmedBookingData} />
 * );
 *
 * @returns {ReactElement} The BookingConfirmationModal component.
 */
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
