import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function BasicInfo({
  name,
  setValue,
  description,
  price,
  setPrice,
  maxGuests,
  setMaxGuests,
}) {
  return (
    <Form className="d-flex row gap-3">
      <h4>Basic Information</h4>
      <Form.Group controlId="name">
        <Form.Label className="p-0 m-0">Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setValue("name", e.target.value)}
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label className="p-0 m-0">Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setValue("description", e.target.value)}
          placeholder="Enter description"
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label className="p-0 m-0">Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setValue("price", parseFloat(e.target.value))}
            placeholder="Enter price"
          />
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="maxGuests">
        <Form.Label className="p-0 m-0">Max Guests</Form.Label>
        <Form.Control
          type="number"
          value={maxGuests}
          onChange={(e) => setValue("maxGuests", parseFloat(e.target.value))}
          placeholder="Enter max guests"
        />
      </Form.Group>
    </Form>
  );
}

export default BasicInfo;
