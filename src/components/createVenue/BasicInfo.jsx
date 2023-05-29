import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

/**
 * The `BasicInfo` functional component displays a form that accepts basic information about a listing.
 *
 * @component
 * @param {Object} props - The properties passed down from the parent component.
 * @param {string} props.name - The name of the listing.
 * @param {Function} props.setValue - A function that updates the state of the form.
 * @param {string} props.description - The description of the listing.
 * @param {number} props.price - The price of the listing.
 * @param {number} props.maxGuests - The maximum number of guests allowed in the listing.
 *
 * @example
 * return (
 *   <BasicInfo
 *     name={currentName}
 *     setValue={updateValue}
 *     description={currentDescription}
 *     price={currentPrice}
 *     maxGuests={currentMaxGuests}
 *   />
 * )
 *
 * @returns {ReactElement} The `BasicInfo` component, a form for entering the basic information about a listing.
 */
function BasicInfo({ name, setValue, description, price, maxGuests }) {
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
