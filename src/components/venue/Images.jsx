import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import Carousel from "react-bootstrap/Carousel";
function Images(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Carousel interval={null} slide={false}>
          {props.data.media.map((image) => (
            <Carousel.Item>
              <img src={image} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal>
      <Row onClick={handleShow} className="images imgContainer" md={6}>
        <Col md={6} className="m-0 p-0 img ">
          <img className="img-fluid shadow" src={props.data.media[0]} alt="" />
        </Col>
        <Col md={6}>
          <Row className="h-100">
            {props.data.media.slice(1, 5).map((image) => {
              return (
                <Col className="m-0 p-0 img " xs={6}>
                  <img className="img-fluid shadow" src={image} alt="" />
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
