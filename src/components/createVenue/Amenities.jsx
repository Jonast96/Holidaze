import React from "react";
import Form from "react-bootstrap/Form";

/**
 * The `Amenities` functional component displays a form with checkboxes for selecting amenities.
 *
 * @component
 * @param {Object} props - The properties passed down from the parent component.
 * @param {Object} props.meta - An object that contains the current state of the form.
 * @param {Function} props.setMeta - A function that updates the state of the form.
 *
 * @example
 * return (
 *   <Amenities
 *     meta={currentAmenities}
 *     setMeta={updateAmenities}
 *   />
 * )
 *
 * @returns {ReactElement} The `Amenities` component, a form for selecting various amenities.
 */
function Amenities({ meta, setMeta }) {
  /**
   * Handles changes to the checkboxes in the form, updating the `meta` state accordingly.
   * @param {Object} event - The event object from the checkbox input change.
   */
  function handleAmenityChange(event) {
    const { name, checked } = event.target;
    setMeta({
      ...meta,
      [name]: checked,
    });
  }

  return (
    <div className="meta">
      <h4>Select meta</h4>
      <Form.Group className="d-flex gap-2" controlId="parking">
        <Form.Check
          type="checkbox"
          name="parking"
          onChange={handleAmenityChange}
        />
        <Form.Label>Parking</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex gap-2" controlId="wifi">
        <Form.Check
          type="checkbox"
          name="wifi"
          onChange={handleAmenityChange}
        />
        <Form.Label>Wifi</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex gap-2" controlId="breakfast">
        <Form.Check
          type="checkbox"
          name="breakfast"
          onChange={handleAmenityChange}
        />
        <Form.Label>Breakfast</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex gap-2" controlId="pets">
        <Form.Check
          type="checkbox"
          name="pets"
          onChange={handleAmenityChange}
        />
        <Form.Label>Pets</Form.Label>
      </Form.Group>
    </div>
  );
}

export default Amenities;
