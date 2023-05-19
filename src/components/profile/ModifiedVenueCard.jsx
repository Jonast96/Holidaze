import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

export default function VenueCard(props) {
  const [index, setIndex] = useState(0);

  const handleImageError = (e) => {
    e.target.src = props.placeholder;
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [mouseOver, setMouseOver] = useState(false);

  return (
    <Col className="mb-4" md={6} lg={4} xxl={3}>
      <Card
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        as="div"
        className="border-light shadow-sm h-100 venueCard"
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
