import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./becomeHost.scss";
import Accordion from "react-bootstrap/Accordion";

import illustration from "../..//assets/media/illustration.jpg";
import illustrationTwo from "../../assets/media/illustrationTwo.jpg";
import illustrationThree from "../../assets/media/illustrationThree.jpg";
export default function BecomeHost() {
  return (
    <Container className="mt-5">
      <Row className="mb-5 ">
        <Col className="d-flex row mb-3" sm={12} md={6}>
          <h1>Ready to take the next step with HoliDaze?</h1>
          <p>Become a host today and unlock a world of opportunities</p>
          <Button className="button" variant="primary">
            Become a host
          </Button>
        </Col>
        <Col className="imgCol" sm={12} md={6}>
          <img
            className="img-fluid illustration"
            src={illustration}
            alt="illustration"
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="imgCol  mobileNone">
          <img
            className="img-fluid illustration"
            src={illustrationTwo}
            alt=""
          />
        </Col>
        <Col>
          <h2>Benefits and Responsibilities</h2>
          <h5 className="mt-3">
            Being a host comes with several exciting benefits:
          </h5>
          <ul className="d-flex row gap-2">
            <li>Earn additional income from your property</li>
            <li>Meet people from around the world</li>
            <li>Be part of a global host community</li>
          </ul>
          <h5 className="mt-3">
            However, being a host also comes with responsibilities:
          </h5>
          <ul className="d-flex row gap-2">
            <li>Provide a safe and clean environment for your guests</li>
            <li>Be available to answer questions and provide assistance</li>
            <li>
              Ensure your property is accurately represented in your listing
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                How does the payment process work?
              </Accordion.Header>
              <Accordion.Body>
                When a guest books your property, the payment is processed
                through our secure payment system. The amount, minus Holidaze's
                service fee, is then released to your specified bank account
                within 24 hours after the guest's check-in.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                What are the fees for becoming a VenueManager?
              </Accordion.Header>
              <Accordion.Body>
                There is no upfront fee to list your property on Holidaze. We
                only charge a small percentage as a service fee from each
                booking. The exact percentage can vary depending on the location
                and the type of property.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                How do I list my property on Holidaze?
              </Accordion.Header>
              <Accordion.Body>
                To list your property on Holidaze, you must first create an
                account. Once you have created an account, you can list your
                property by clicking on the "Add listing" button in the
                navigation bar.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                What if I need help as a VenueManager?
              </Accordion.Header>
              <Accordion.Body>
                If you need help as a VenueManager, you can contact us by email
                at
                <a href="mailto: # "> support@holidaze</a> or by phone at
                <a href="tel: # "> +47 123 45 678</a>.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col className="imgCol mobileNone">
          <img
            className="img-fluid illustration"
            src={illustrationThree}
            alt=""
          />
        </Col>
      </Row>
    </Container>
  );
}
