import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

/**
 * This is a VenueCard component. It presents the venue in a Card format with details such as name, location and price per night.
 * The card also includes a carousel to cycle through the venue's images if there is more than one image.
 *
 * @component
 * @param {Object} props - Properties passed to component. Expecting 'img', 'placeholder', 'id', 'name', 'location', 'price'
 * @param {string[]} props.img - Array of URLs of the venue's images.
 * @param {string} props.placeholder - Placeholder image if the venue's image cannot be loaded.
 * @param {string} props.id - The ID of the venue.
 * @param {string} props.name - The name of the venue.
 * @param {Object} props.location - The location of the venue.
 * @param {string} props.location.city - The city where the venue is located.
 * @param {string} props.location.country - The country where the venue is located.
 * @param {number} props.price - The price per night at the venue.
 *
 * @example
 * <VenueCard img={imgUrls} placeholder={placeholderUrl} id={venueId} name={venueName} location={venueLocation} price={venuePrice} />
 */
export default function VenueCard(props) {
  const [index, setIndex] = useState(0);

  const handleImageError = (e) => {
    e.target.src = props.placeholder;
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [mouseOver, setMouseOver] = useState(false);

  return (
    <Col className="mb-4" md={6} lg={4} xxl={3}>
      <Card
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        as="div"
        className="border-light shadow-sm h-100"
      >
        <div className="imgContainer ">
          {props.img.length > 1 ? (
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              interval={null}
            >
              {props.img.map((imageSrc, index) => (
                <Carousel.Item key={index}>
                  <Link to={`/venue/${props.id}`}>
                    <div className="imgContainer">
                      <Card.Img variant="top" src={imageSrc} />
                    </div>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Link to={`/venue/${props.id}`}>
              <div className="imgContainer">
                <Card.Img
                  onError={handleImageError}
                  variant="top"
                  src={props.img}
                />
              </div>
            </Link>
          )}
        </div>
        <Link to={`/venue/${props.id}`}>
          <div
            className={
              mouseOver
                ? "link-dark cardInfo p-2 text-decoration-underline"
                : "link-dark cardInfo p-2"
            }
          >
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
              {props.location.city}, {props.location.country}
            </Card.Text>
            <Card.Body className="p-0">
              <span className="fw-bold">${props.price},-</span> per night
            </Card.Body>
          </div>
        </Link>
      </Card>
    </Col>
  );
}
