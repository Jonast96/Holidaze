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
              <img src={image} alt="" />
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

      {props.data.media.length > 4 ? (
        <Row
          onClick={handleShow}
          className="images imgContainer desktopVersion w-100 h-100 m-0 "
          md={6}
        >
          <Col md={6} className="m-0 p-0  ">
            <div className="mainImage">
              <img className=" shadow-sm" src={props.data.media[0]} alt="" />
            </div>{" "}
          </Col>
          <Col md={6}>
            <Row className="h-100">
              {props.data.media.slice(1, 5).map((image, index, slicedArray) => {
                return (
                  <Col key={index} className="m-0 p-0 smallImages" xs={6}>
                    <img className=" shadow-sm" src={image} alt="" />
                    {index === slicedArray.length - 1 ? (
                      <div className="fs-5">+{props.data.media.length}</div>
                    ) : null}
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      ) : props.data.media.length > 2 ? (
        <Row
          onClick={handleShow}
          className="images imgContainer desktopVersion w-100 h-100 m-0 "
          md={6}
        >
          <Col md={6} className="m-0 p-0  ">
            <div className="mainImage">
              <img className=" shadow-sm" src={props.data.media[0]} alt="" />
            </div>{" "}
          </Col>
          <Col md={6}>
            <Row className="h-100">
              {props.data.media.slice(1, 5).map((image, index, slicedArray) => {
                return (
                  <Col key={index} className="m-0 p-0 smallImages " xs={12}>
                    <img className=" shadow-sm" src={image} alt="" />
                    {index === slicedArray.length - 1 ? (
                      <div className="fs-5">+{props.data.media.length}</div>
                    ) : null}
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      ) : (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
          {props.data.media.map((imageSrc, index) => (
            <Carousel.Item key={index}>
              <img
                onClick={handleShow}
                className="img-fluid images"
                src={imageSrc}
                alt=""
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default Images;
