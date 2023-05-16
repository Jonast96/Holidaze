import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

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

  console.log(updatedUser);

  function handleChange(event) {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  }

  console.log(updatedUser);

  return (
    <Row className="header text-center align-items-center">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              // editInfo(updatedUser);
              handleClose();
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
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={updatedUser.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMedia">
              <Form.Label>Media</Form.Label>
              <Form.Control
                type="text"
                name="media"
                placeholder="Enter media URL"
                value={updatedUser.media}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
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
