import React, { useState } from "react";
import { Col, Row, Form, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import image from "../.././assets//media/registerImage.jpg";
import { registerSchema } from "./validation/registerSchema";
import CustomAlert from "../CustomAlert";
import "./register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(props) {
  function notify() {
    return toast(<CustomAlert message={"Successfully registered"} />);
  }

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

  function handleChange(e) {
    const { name, value, type } = e.target;

    if (type === "radio" && name === "registrationType") {
      setFormValues({ ...formValues, venueManager: JSON.parse(value) });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  }

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      handleSubmit();
    }
  };

  function handleSubmit() {
    notify();
    props.onHide();
    console.log(formValues);
  }

  return (
    <Container>
      <Modal size="lg" centered show={props.show} onHide={props.onHide}>
        <Row className="register">
          <Col lg={6}>
            <img className="img-fluid h-100" src={image} alt="" />
          </Col>
          <Col lg={6}>
            <Modal.Title className="text-center">Register</Modal.Title>
            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
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

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        closeButton={false}
      />
    </Container>
  );
}

export default Register;
