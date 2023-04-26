import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function BasicInfo({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  maxGuests,
  setMaxGuests,
}) {
  return (
    <Form>
      <h4>Basic Information</h4>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="maxGuests">
        <Form.Label>Max Guests</Form.Label>
        <Form.Control
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          placeholder="Enter max guests"
        />
      </Form.Group>
    </Form>
  );
}

export default BasicInfo;
