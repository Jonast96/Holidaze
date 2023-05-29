import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/**
 * `EditModal` is a React component that provides a modal dialog with two buttons.
 * The "Close" button closes the dialog, and the "Continue editing" button also closes
 * the dialog, presumably for the user to continue editing in another context.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.show - Boolean to control the visibility of the modal.
 * @param {function} props.handleClose - Function to close the modal.
 * @param {ReactElement} props.body - The content to be displayed in the body of the modal.
 *
 * @example
 * return (
 *   <EditModal
 *     show={isModalVisible}
 *     handleClose={closeModalHandler}
 *     body={<div>Modal Content</div>}
 *   />
 * );
 *
 * @returns {ReactElement} The EditModal component.
 */
function EditModal({ show, handleClose, body }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Continue editing
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
