import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import VenueCard from "../VenueCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import noImg from "../../assets/media/no-photo.png";
import Dropdown from "react-bootstrap/Dropdown";

export default function FeaturedVenues({ data, setSorting }) {
  return (
    <section id="featuredVenues" className="featuredVenues">
      <Container>
        <h4 className="fs-2 text-center mt-4 fw-light text-secondary">
          Featured Venues
        </h4>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <FontAwesomeIcon icon={faFilter} className="me-2" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setSorting("&sort=price&sortOrder=asc");
              }}
            >
              Price low-high
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSorting("&sort=price&sortOrder=desc");
              }}
            >
              Price high-low
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSorting("&sort=name&sortOrder=asc");
              }}
            >
              Name A-Z
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSorting("&sort=name&sortOrder=desc");
              }}
            >
              Name Z-A
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
