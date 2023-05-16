import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { editUserSchema } from "../auth/validation/editUserSchema";
export default function ProfileHeader({
  image,
  title,
  description,
  user,
  logout,
  editInfo,
}) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updatedUser, setUpdatedUser] = React.useState({
    name: user?.name,
    email: user?.email,
    media: user?.media ? user.media : "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    media: "",
  });

  console.log(updatedUser);

  function handleChange(event) {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  }

  async function validateForm(data) {
    try {
      await editUserSchema.validate(data, { abortEarly: false });
      console.log("Validation successful!");
      //clears errors
      setErrors({
        name: "",
        email: "",
        media: "",
      });
      return true;
    } catch (error) {
      const errors = {};
      error.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors(errors);

      console.error("Validation failed: ", error.message);
      return false;
    }
  }

  return (
    <Row className="header text-center align-items-center">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={async (event) => {
              event.preventDefault();
              const isValid = await validateForm(updatedUser);
              if (isValid) {
                editInfo(updatedUser);
                handleClose();
              } else {
                console.log("Validation failed!");
              }
            }}
          >
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={updatedUser.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />

              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={updatedUser.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formMedia">
              <Form.Label>Media</Form.Label>
              <Form.Control
                type="text"
                name="media"
                placeholder="Enter media URL"
                value={updatedUser.media}
                onChange={handleChange}
                isInvalid={!!errors.media}
              />
              <Form.Control.Feedback type="invalid">
                {errors.media}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary">
              Save changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Col sm={12} lg={3}>
        <img src={image} alt={image} />
        <p className="m-1 p-0">{user.name}</p>
        <p className="m-1 p-0">{user.email}</p>
        <Button
          onClick={handleShow}
          variant="outline-primary text-black fw-light m-0 py-1 leftBtn"
        >
          Edit Profile
        </Button>
        <Button
          onClick={logout}
          variant="outline-danger border-danger text-black fw-light m-0 py-1 rightBtn"
        >
          Logout
        </Button>
      </Col>
      <Col sm={12} lg={9}>
        <h1 className="m-0 p-0">{title}</h1>
        <p className="m-0 p-0">{description}</p>
      </Col>
    </Row>
  );
}
