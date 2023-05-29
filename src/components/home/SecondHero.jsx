import React from "react";
import beach from "../../assets/media/beach.jpg";
import mountain from "../../assets/media/mountain.jpg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * The `SecondHero` functional component represents a section of a webpage that features two types of destinations: beach (Tropical Escapes) and mountain (Mountain Adventures).
 * This component is meant to inspire users to explore these types of destinations.
 *
 * @component
 *
 * @example
 * return (
 *   <SecondHero />
 * );
 *
 * @returns {ReactElement} The `SecondHero` component to showcase two types of destinations.
 */
export default function SecondHero() {
  return (
    <section className="secondHero">
      <Container className="info mt-5">
        <h2>Explore Our Destinations</h2>
        <p>
          Whether you're dreaming of a serene beach vacation or an exhilarating
          mountain adventure, Holidaze offers a diverse range of accommodations
          to suit every traveler's taste. Discover some of our top picks and
          start planning your next unforgettable getaway
        </p>
      </Container>
      <Container className="mt-4">
        <Row>
          <Col className="mb-3" lg={6} sm={12}>
            <div className="overlayContainer">
              <img className="img-fluid shadow" src={beach} alt="" />
              <div className="overlay" />
              <div className="secondHeroTextContainer">
                <h3 className="">Tropical Escapes</h3>
                <p>
                  Discover a world of sun, sand, and relaxation at our
                  handpicked beach destinations. Unwind by the shore, soak in
                  the sun, and let the waves wash away your worries. Explore our
                  curated selection of beach getaways and find your perfect
                  seaside retreat
                </p>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <div className="overlayContainer">
              <img className="img-fluid shadow" src={mountain} alt="" />
              <div className="overlay" />
              <div className="secondHeroTextContainer">
                <h3 className="">Mountain Adventures</h3>
                <p>
                  Experience the breathtaking beauty of majestic mountains, lush
                  forests, and serene landscapes. Immerse yourself in nature
                  with our selection of mountain lodges and retreats. Whether
                  you're seeking thrilling outdoor activities or a peaceful
                  escape, the mountains are calling
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
