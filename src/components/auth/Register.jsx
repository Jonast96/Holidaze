/**

@file
This file defines the Register component, which is responsible for rendering the registration form, handling user input, and submitting the form data to the server.
*/
// External dependencies
import React, { useState } from "react";
import { Col, Row, Form, Container, Button, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

// Internal dependencies
import image from "../.././assets//media/registerImage.jpg";
import { registerSchema } from "./validation/registerSchema";
import "./register.scss";

/**
 * `Register` is a functional React component that displays the registration form and handles form submission.
 *
 * @param {object} props - The properties passed to the component.
 * @param {boolean} props.show - Indicates whether the modal should be shown or hidden. Pass `true` to show the modal, and `false` to hide it.
 * @param {function} props.onHide - A function that is called when the modal needs to be hidden. Typically, this function should update the parent component's state to change the `show` prop value to `false`.
 * @returns {ReactElement} The rendered `Register` component.
 */
function Register(props) {
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
    venueManager: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  });

  const [venueManager, setVenueManager] = React.useState(false);

  /**
   * Handles changes to the form input fields.
   * @param {Object} e - Event object.
   */
  function handleChange(e) {
    const { name, value, type } = e.target;

    if (type === "radio" && name === "registrationType") {
      setFormValues({ ...formValues, venueManager: JSON.parse(value) });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  }

  /**
   * Validates the form data against the `registerSchema` validation schema.
   *
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the form data is valid.
   */
  const validateForm = async () => {
    try {
      await registerSchema.validate(formValues, { abortEarly: false });
      setFormErrors({
        name: "",
        email: "",
        avatar: "",
        password: "",
        venueManager: "",
      });
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
      return false;
    }
  };

  /**
   * Handles form submission by validating the form data and, if valid, calling `handleSubmit`.
   *
   * @param {object} e - The form submit event.
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      handleSubmit();
    }
  };

  /**
   * Submits the form data to the server and displays a notification upon successful registration.
   * If an error occurs during the API call, logs the error.
   */
  async function handleSubmit() {
    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        console.log(json.errors[0].message);
        setErrorMessage(json.errors[0].message);
        throw new Error("API call failed");
      }
      if (response.ok) {
        props.onHide();
      }
      alert(`Hello ${json.name}! You have been registered.`);
      props.close();
    } catch (error) {
      console.error("Error while making API call:", error);
    }
  }

  // Return statement for rendering the `Register` component
  return (
    <Container>
      <Modal size="lg" centered show={props.show} onHide={props.onHide}>
        <Row className="register">
          <Col lg={6}>
            <img className="img-fluid h-100" src={image} alt="" />
          </Col>
          <Col lg={6} className="p-3">
            <button
              onClick={props.onHide}
              type="button"
              className="btn-close float-end"
              aria-label="Close"
            ></button>
            <Modal.Title className="text-center">Register</Modal.Title>

            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
                {errorMessage && (
                  <Alert className="border-danger bg-light">
                    {errorMessage}
                  </Alert>
                )}
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter full name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    isInvalid={!!formErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    isInvalid={!!formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                  <Form.Label>Profile avatar</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    name="avatar"
                    value={formValues.avatar}
                    onChange={handleChange}
                    isInvalid={!!formErrors.avatar}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.avatar}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    isInvalid={!!formErrors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <p className="text-center">Select your account type</p>
                <Form.Group className="my-4 d-flex">
                  <div className="radioWrapper w-100">
                    <Form.Check
                      onChange={handleChange}
                      type="radio"
                      id="guest"
                      name="registrationType"
                      label=""
                      value={false}
                      onClick={() => setVenueManager(false)}
                    />
                    <label
                      htmlFor="guest"
                      className={
                        !venueManager ? "customRadio selected" : "customRadio"
                      }
                    >
                      Guest
                    </label>
                  </div>
                  <div className="radioWrapper w-100">
                    <Form.Check
                      onChange={handleChange}
                      type="radio"
                      id="host"
                      name="registrationType"
                      label=""
                      onClick={() => setVenueManager(true)}
                      value={true}
                    />
                    <label
                      htmlFor="host"
                      className={
                        venueManager ? "customRadio selected" : "customRadio"
                      }
                    >
                      Host
                    </label>
                  </div>
                </Form.Group>
                <Button className="w-100 p-3" variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Modal.Body>
          </Col>
        </Row>
      </Modal>
    </Container>
  );
}

export default Register;
