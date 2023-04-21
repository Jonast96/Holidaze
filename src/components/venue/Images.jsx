import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import Carousel from "react-bootstrap/Carousel";
function Images(props) {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Carousel interval={null} slide={false}>
          {props.data.media.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal>

      <Carousel
        className="mobileVersion"
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
      >
        {props.data.media.map((imageSrc, index) => (
          <Carousel.Item key={index}>
            <img
              onClick={handleShow}
              className="img-fluid"
              src={imageSrc}
              alt=""
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Row
        onClick={handleShow}
        className="images imgContainer desktopVersion"
        md={6}
      >
        <Col md={6} className="m-0 p-0  ">
          <img className="img-fluid shadow" src={props.data.media[0]} alt="" />
        </Col>
        <Col md={6}>
          <Row className="h-100">
            {props.data.media.slice(1, 5).map((image, index, slicedArray) => {
              return (
                <Col key={index} className="m-0 p-0  smallImages" xs={6}>
                  <img className="img-fluid shadow" src={image} alt="" />
                  {index === slicedArray.length - 1 ? (
                    <div className="fs-5">+{props.data.media.length}</div>
                  ) : null}
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Images;
