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

  return (
    <Col md={6} xl={4}>
      <Card className="shadow h-100">
        <div className="imgContainer">
          <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            {props.img.map((imageSrc, idx) => (
              <Carousel.Item key={idx}>
                <div className="imgContainer">
                  <Card.Img
                    onError={handleImageError}
                    variant="top"
                    src={imageSrc}
                    alt={`Slide ${idx}`}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <Card.Title>{props.name}</Card.Title>
        <Card.Body>{props.description}</Card.Body>
        <Card.Footer>Testing</Card.Footer>
      </Card>
    </Col>
  );
}
