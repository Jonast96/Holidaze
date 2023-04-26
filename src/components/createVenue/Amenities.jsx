import React from "react";
import Form from "react-bootstrap/Form";

function Amenities({ amenities, setAmenities }) {
  function handleAmenityChange(event) {
    const { name, checked } = event.target;
    setAmenities({
      ...amenities,
      [name]: checked,
    });
  }

  return (
    <div className="amenities">
      <h4>Select amenities</h4>
      <Form.Group className="d-flex gap-2" controlId="Parking">
        <Form.Check
          type="checkbox"
          name="Parking"
          onChange={handleAmenityChange}
        />
        <Form.Label>Parking</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex gap-2" controlId="Wifi">
        <Form.Check
          type="checkbox"
          name="Wifi"
          onChange={handleAmenityChange}
        />
        <Form.Label>Wifi</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex gap-2" controlId="Breakfast">
        <Form.Check
          type="checkbox"
          name="Breakfast"
          onChange={handleAmenityChange}
        />
        <Form.Label>Breakfast</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex gap-2" controlId="Pets">
        <Form.Check
          type="checkbox"
          name="Pets"
          onChange={handleAmenityChange}
        />
        <Form.Label>Pets</Form.Label>
      </Form.Group>
    </div>
  );
}

export default Amenities;
