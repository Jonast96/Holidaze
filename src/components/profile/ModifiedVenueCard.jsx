import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default function VenueCard(props) {
  const [index, setIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleImageError = (e) => {
    e.target.src = props.placeholder;
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US").format(date);
  }

  const [mouseOver, setMouseOver] = useState(false);

  return (
    <Col className="mb-4" md={6} lg={4} xxl={3}>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {" "}
          <ListGroup>
            <ListGroupItem>
              Booking created the: {formatDate(props.bookingInfo.created)}
            </ListGroupItem>
            <ListGroupItem>
              Booking starts the: {formatDate(props.bookingInfo.dateFrom)}
            </ListGroupItem>
            <ListGroupItem>
              Booking ends the: {formatDate(props.bookingInfo.dateTo)}
            </ListGroupItem>
            <ListGroupItem>
              Number of guests: {props.bookingInfo.guests}
            </ListGroupItem>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to={`/venue/${props.id}`}>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
              }}
            >
              View Venue
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <Card
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        as="div"
        className="border-light shadow-sm h-100 venueCard"
        onClick={handleShow}
      >
        <div className="imgContainer ">
          {props.img.length > 1 ? (
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              interval={null}
            >
              {props.img.map((imageSrc, index) => (
                <Carousel.Item key={index}>
                  <div className="imgContainer">
                    <Card.Img variant="top" src={imageSrc} />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="imgContainer">
              <Card.Img
                onError={handleImageError}
                variant="top"
                src={props.img}
              />
            </div>
          )}
        </div>
        <div
          className={
            mouseOver
              ? "link-dark cardInfo p-2 text-decoration-underline"
              : "link-dark cardInfo p-2"
          }
        >
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {props.location.city}, {props.location.country}
          </Card.Text>
          <Card.Body className="p-0">
            <span className="fw-bold">${props.price},-</span> per night
          </Card.Body>
        </div>
      </Card>
    </Col>
  );
}
