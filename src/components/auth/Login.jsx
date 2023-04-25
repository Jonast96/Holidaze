// External dependencies
import React, { useState } from "react";
import { Col, Row, Form, Container, Button, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";

// Internal dependencies
import image from "../.././assets//media/registerImage.jpg";
import { loginSchema } from "./validation/loginSchema";
import "./register.scss";
import { UserContext } from "../Context";
function Login(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = React.useContext(UserContext);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validateForm = async () => {
    try {
      await loginSchema.validate(formValues, { abortEarly: false });
      setFormErrors({
        email: "",
        password: "",
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

  async function handleSubmit() {
    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      const json = await response.json();
      console.log(json);
      const user = {
        name: json.name,
        email: json.email,
        isVenueManager: json.venueManager,
        avatar: json.avatar,
        token: json.accessToken,
      };
      localStorage.setItem("user", JSON.stringify(user));

      if (!response.ok) {
        setErrorMessage(json.errors[0].message);
        throw new Error("API call failed");
      }
      props.onHide();
      setUser({
        loggedIn: true,
        venueManager: json.venueManager,
        token: json.accessToken,
      });
    } catch (error) {
      console.error("Error while making API call:", error);
    }
  }

  return (
    <Container className="login">
      <Modal size="lg" centered show={props.show} onHide={props.onHide}>
        <Row className="register">
          <Col lg={6}>
            <img className="img-fluid h-25" src={image} alt="" />
          </Col>
          <Col lg={6} className="p-3">
            <button
              onClick={props.onHide}
              type="button"
              class="btn-close float-end"
              aria-label="Close"
            ></button>
            <Modal.Title className="text-center">Login</Modal.Title>

            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
                {errorMessage && (
                  <Alert className="border-danger bg-light">
                    {errorMessage}
                  </Alert>
                )}
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

                <Button className="w-100 p-3" variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Modal.Body>
          </Col>
        </Row>
      </Modal>
    </Container>
  );
}

export default Login;
