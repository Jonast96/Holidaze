import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./createVenue.scss";
import Media from "./Media";

import BasicInfo from "./BasicInfo";
import Amenities from "./Amenities";
function CreateVenue() {
  const [step, setStep] = useState(1);
  const progress = (step / 4) * 100;

  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    mediaUrls: [],
    amenities: {
      Parking: false,
      Wifi: false,
      Breakfast: false,
      Pets: false,
    },
    location: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  function setName(value) {
    setVenueData({ ...venueData, name: value });
  }

  function setDescription(value) {
    setVenueData({ ...venueData, description: value });
  }

  function setPrice(value) {
    setVenueData({ ...venueData, price: value });
  }

  function setMaxGuests(value) {
    setVenueData({ ...venueData, maxGuests: value });
  }

  function setMediaUrls(value) {
    setVenueData({ ...venueData, mediaUrls: value });
  }

  function setAmenities(value) {
    setVenueData({ ...venueData, amenities: value });
  }

  function setAddress(value) {
    setVenueData({
      ...venueData,
      location: { ...venueData.location, address: value },
    });
  }

  function handleNext() {
    if (step < 4) {
      setStep(step + 1);
    }
    console.log(venueData);
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <Container className="mt-5 mainContent">
      <Row>
        <Col>
          <h1 className="fs-3">Add new venue</h1>
          <ProgressBar now={progress} label={`${progress}%`} />
        </Col>
      </Row>
      <Row>
        <Col>
          {step === 1 && (
            <BasicInfo
              name={venueData.name}
              setName={setName}
              description={venueData.description}
              setDescription={setDescription}
              price={venueData.price}
              setPrice={setPrice}
              maxGuests={venueData.maxGuests}
              setMaxGuests={setMaxGuests}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {step === 2 && (
            <Media
              mediaUrls={venueData.mediaUrls}
              setMediaUrls={setMediaUrls}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {step === 3 && (
            <Amenities
              amenities={venueData.amenities}
              setAmenities={setAmenities}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {step === 4 && (
            <div>
              Location
              <Button>Submit</Button>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-between mt-3">
          <Button onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={step === 4}>
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateVenue;
