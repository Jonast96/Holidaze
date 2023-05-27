// External imports
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Internal imports
import "./createVenue.scss";
import Media from "./Media";
import BasicInfo from "./BasicInfo";
import Amenities from "./Amenities";
import Location from "./Location";
import Preview from "./Preview";
import PageNotFound from "../404_loading_etc/PageNotFound";

/**
 * The `CreateVenue` functional component displays a form for creating a new venue.
 *
 * @component
 *
 * @example
 * return (
 *   <CreateVenue />
 * )
 *
 * @returns {ReactElement} The `CreateVenue` component, a multi-step form for creating a new venue.
 */
function CreateVenue() {
  const [step, setStep] = useState(1);
  const progress = (step / 5) * 100;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");

  function handleClose() {
    setShowSuccessModal(false);
    setShowErrorModal(false);
  }

  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  const user = JSON.parse(localStorage.getItem("user"));

  function setValue(name, value) {
    setVenueData((prevState) => ({ ...prevState, [name]: value }));
  }

  function setMedia(value) {
    setVenueData({ ...venueData, media: value });
  }

  function setMeta(value) {
    setVenueData({ ...venueData, meta: value });
  }

  function setLocation(value) {
    setVenueData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        ...value,
      },
    }));
  }

  function handleNext() {
    if (step < 5) {
      setStep(step + 1);
    }
    console.log(venueData);
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  async function handleSubmit() {
    const response = "https://api.noroff.dev/api/v1/holidaze/venues";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(venueData),
    };
    try {
      const result = await fetch(response, options);
      const json = await result.json();
      if (result.ok) {
        setShowSuccessModal(true);
        console.log(json);
      } else {
        setError(
          json.errors.map((error) => {
            return (
              <div className="d-flex">
                <p className="me-2">{error.message}</p>
                <p className="me-2">{error.message}</p>
              </div>
            );
          })
        );
        setShowErrorModal(true);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return user && user.isVenueManager ? (
    <Container className="my-5 mainContent">
      <Row>
        <Col>
          <h1 className="fs-3">Add new venue</h1>
          <ProgressBar now={progress} label={`${progress}%`} />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>{step === 1 && <BasicInfo setValue={setValue} />}</Col>
      </Row>
      <Row>
        <Col>
          {step === 2 && <Media media={venueData.media} setMedia={setMedia} />}
        </Col>
      </Row>
      <Row>
        <Col>
          {step === 3 && <Amenities meta={venueData.meta} setMeta={setMeta} />}
        </Col>
      </Row>
      <Row>
        <Col>
          {step === 4 && (
            <Location location={venueData.location} setLocation={setLocation} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {step === 5 && (
            <Preview
              media={venueData.media}
              payload={venueData}
              name={venueData.name}
              maxGuests={venueData.maxGuests}
              description={venueData.description}
              owner={user.username}
              meta={venueData.meta}
              location={venueData.location}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-between mt-3">
          <Button onClick={handleBack} disabled={step === 1}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          {step < 5 ? (
            <Button onClick={handleNext}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </Col>
      </Row>
      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your venue has been successfully added!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={handleClose}>
        <Modal.Header closeButton className="error-modal-header">
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="error-modal-body">{error}</Modal.Body>
        <Modal.Footer className="error-modal-footer">
          <Button
            style={{ backgroundColor: "#f2994a", borderColor: "#f2994a" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  ) : (
    <PageNotFound />
  );
}

export default CreateVenue;
