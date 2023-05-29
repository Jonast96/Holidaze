import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import VenueCard from "../VenueCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import noImg from "../../assets/media/no-photo.png";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

/**
 * The `FeaturedVenues` functional component displays a list of featured venues and provides sorting functionality.
 * The venues are presented in a 'VenueCard' format, and can be sorted by price (low to high or high to low) or name (A-Z or Z-A).
 *
 * @component
 *
 * @example
 * return (
 *   <FeaturedVenues data={venueData} setSorting={updateSortingFunction} />
 * );
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.data - An array of venue objects. Each object should contain information about the venue, such as name, id, media, price, and location.
 * @param {function} props.setSorting - The function to call when a user selects a sorting option. This function should accept a string that specifies the new sorting order.
 *
 * @returns {ReactElement} The `FeaturedVenues` component presenting the list of featured venues and sorting options.
 */
export default function FeaturedVenues({ data, setSorting }) {
  return (
    <section id="featuredVenues" className="featuredVenues">
      <Container>
        <h4 className="fs-2 text-center mt-4 fw-light text-secondary">
          Featured Venues
        </h4>
        <Dropdown className="mb-2">
          <a href="#search">
            <Button className="me-1">
              <FontAwesomeIcon icon={faSearch} className="me-2" />
            </Button>
          </a>
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
