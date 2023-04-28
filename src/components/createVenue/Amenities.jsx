import React from "react";
import Form from "react-bootstrap/Form";

function Amenities({ meta, setMeta }) {
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
