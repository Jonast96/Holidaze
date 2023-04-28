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
import Location from "./Location";
import Preview from "./Preview";
function CreateVenue() {
  const [step, setStep] = useState(1);
  const progress = (step / 5) * 100;

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
      console.log(json);
    } catch (error) {
      console.log(error);
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
      <Row className="mt-2">
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
        <Col>{step === 5 && <Preview data={venueData} />}</Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-between mt-3">
          <Button onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          {step < 5 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CreateVenue;
