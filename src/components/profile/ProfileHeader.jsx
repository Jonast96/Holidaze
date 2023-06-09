import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

/**
 * `ProfileHeader` component represents the header of a user's profile page.
 * It includes user details and controls to edit media or logout.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {String} props.image - The image URL of the user.
 * @param {String} props.title - The title of the user's profile.
 * @param {String} props.description - The description of the user's profile.
 * @param {Object} props.user - The user object containing user details.
 * @param {Function} props.logout - The function to handle user logout.
 * @param {Function} props.editInfo - The function to edit user information.
 *
 * @example
 * return (
 *   <ProfileHeader image="user.png" title="User Name" description="User description" user={userData} logout={handleLogout} editInfo={handleEditInfo} />
 * );
 *
 * @returns {ReactElement} The ProfileHeader component.
 */
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

  const [updatedMedia, setUpdatedMedia] = React.useState(user?.media || "");

  const [errors, setErrors] = React.useState("");

  function handleChange(event) {
    setUpdatedMedia(event.target.value);
  }

  async function validateForm(media) {
    if (media) {
      setErrors("");
      return true;
    } else {
      setErrors("Media is required");
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
              const isValid = await validateForm(updatedMedia);
              if (isValid) {
                editInfo(updatedMedia);
                handleClose();
              } else {
                console.log("Validation failed!");
              }
            }}
          >
            <Form.Group controlId="formMedia">
              <Form.Label>Media</Form.Label>
              <Form.Control
                type="text"
                name="media"
                placeholder="Enter media URL"
                value={updatedMedia}
                onChange={handleChange}
                isInvalid={!!errors}
              />
              <Form.Control.Feedback type="invalid">
                {errors}
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
          Edit Media
        </Button>
        <Button
          onClick={logout}
          variant="outline-danger border-danger text-black fw-light m-0 py-1 rightBtn"
        >
          Logout
        </Button>
      </Col>
      <Col sm={12} lg={9}>
        <h1 className="m-0 mb-3 p-0">{title}</h1>
        <p className="m-0 p-0">{description}</p>
      </Col>
    </Row>
  );
}
