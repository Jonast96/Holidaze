import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function Info(props) {
  console.log(props.data.meta);
  return (
    <>
      <Row>
        <Col>
          <h1 className="fw-semibold fs-3 mt-4">{props.data.name}</h1>
          <p>
            {props.data.location.city}, {props.data.location.country}
          </p>
          <div className="d-flex flex-wrap gap-2">
            <p
              className={
                props.data.meta.breakfast
                  ? "metaValues included"
                  : "metaValues notIncluded"
              }
            >
              Breakfast
            </p>
            <p
              className={
                props.data.meta.parking
                  ? "metaValues included"
                  : "metaValues notIncluded"
              }
            >
              Parking
            </p>
            <p
              className={
                props.data.meta.wifi
                  ? "metaValues included"
                  : "metaValues notIncluded"
              }
            >
              Wifi
            </p>
            <p
              className={
                props.data.meta.pets
                  ? "metaValues included"
                  : "metaValues notIncluded"
              }
            >
              Pets
            </p>
          </div>
          <p>{props.data.description}</p>
        </Col>
        <Col>
          <h1 className="fw-semibold fs-3 mt-4">Booking</h1>
        </Col>
      </Row>
    </>
  );
}
export default Info;
