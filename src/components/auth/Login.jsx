// External dependencies
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";

// Internal dependencies
import image from "../.././assets//media/registerImage.jpg";
import { loginSchema } from "./validation/loginSchema";
import "./register.scss";
import { UserContext } from "../Context";

/**
 * `Login` is a functional component that displays a login form.
 *
 * The form has validation that uses the Yup library. It checks for valid email and password inputs.
 * If the form inputs are valid, a login request is made to the server.
 *
 * On successful login, user information is stored in the local storage and the UserContext is updated.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.close - Function to close the login modal.
 * @param {boolean} props.show - Whether or not to show the login modal.
 * @param {Function} props.onHide - Function to hide the login modal.
 *
 * @example
 * return (
 *   <Login close={closeModalFunction} show={isModalVisible} onHide={hideModalFunction} />
 * )
 */
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

  /**
   * Handles changes to the form input fields.
   * @param {Object} e - The event object.
   * @param {string} e.target.name - The name of the input field.
   * @param {string} e.target.value - The value of the input field.
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  /**
   * Validates the form input fields.
   * @returns {boolean} - Whether or not the form is valid.
   */
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

  /**
   * Handles form submission.
   * @param {Object} e - Event object.
   */
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
      if (response.ok) {
        props.close();
      }
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
            <img className="img-fluid h-100" src={image} alt="" />
          </Col>
          <Col lg={6} className="p-3">
            <button
              onClick={props.onHide}
              type="button"
              className="btn-close float-end"
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
