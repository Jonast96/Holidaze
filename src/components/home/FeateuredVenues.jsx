import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";

import VenueCard from "../VenueCard";

import noImg from "../../assets/media/no-photo.png";
export default function FeaturedVenues(props) {
  return (
    <section className="featuredVenues">
      <Container>
        <h4 className="fs-2 text-center mt-4 fw-light text-secondary">
          Featured Venues
        </h4>
        <p className="text-center">
          Filters will go here when api gets updated
        </p>
        <Row>
          {props.data.map((venue) => {
            return (
              <VenueCard
                name={venue.name}
                key={venue.id}
                img={venue.media}
                placeholder={noImg}
                price={venue.price}
                id={venue.id}
                location={venue.location}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
