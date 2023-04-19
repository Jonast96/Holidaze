import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

export default function VenueCard(props) {
  const [index, setIndex] = useState(0);

  const handleImageError = (e) => {
    e.target.src = props.placeholder;
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [mouseOver, setMouseOver] = useState(false);
  console.log(mouseOver ? "Mouse over" : "Mouse not over");

  return (
    <Col className="mb-4" md={6} xl={4}>
      <Card
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        as="div"
        className="shadow-sm h-100"
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
            <Link to={`/venue/${props.id}`}>
              <div className="imgContainer">
                <Card.Img
                  onError={handleImageError}
                  variant="top"
                  src={props.img}
                />
              </div>
            </Link>
          )}
        </div>
        <Link to={`/venue/${props.id}`}>
          <div
            className={
              mouseOver
                ? "link-dark cardInfo p-2 text-decoration-underline"
                : "link-dark cardInfo p-2"
            }
          >
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>City, Country</Card.Text>
            <Card.Body className="p-0">
              <span className="fw-bold">${props.price},-</span> per night
            </Card.Body>
          </div>
        </Link>
      </Card>
    </Col>
  );
}
