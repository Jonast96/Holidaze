import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";

import useApiCall from "../../hooks/useApiCall";
import VenueCard from "../VenueCard";

import noImg from "../../assets/media/no-photo.png";
export default function FeaturedVenues() {
  const { data, loading, error } = useApiCall(
    "https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

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
          {data.map((venue) => {
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
