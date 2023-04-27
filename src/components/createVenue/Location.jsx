import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getNames } from "country-list";

function Location({ location, setLocation }) {
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });

  const countries = getNames();
  const continents = [
    "Africa",
    "Antarctica",
    "Asia",
    "Europe",
    "North America",
    "Australia/Oceania",
    "South America",
  ];

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };

  return (
    <Form>
      <h4>Location data</h4>

      <Form.Group as={Col} controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={location.city}
          onChange={handleLocationChange}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="zip">
        <Form.Label>Zip</Form.Label>
        <Form.Control
          type="text"
          name="zip"
          value={location.zip}
          onChange={handleLocationChange}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          as="select"
          name="country"
          value={location.country}
          onChange={handleLocationChange}
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="continent">
        <Form.Label>Continent</Form.Label>
        <Form.Control
          as="select"
          name="continent"
          value={location.continent}
          onChange={handleLocationChange}
        >
          {continents.map((continent, index) => (
            <option key={index} value={continent}>
              {continent}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="latitude">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="text"
          name="latitude"
          value={location.latitude || coordinates.latitude}
          onChange={handleLocationChange}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="longitude">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          name="longitude"
          value={location.longitude || coordinates.longitude}
          onChange={handleLocationChange}
        />
      </Form.Group>
    </Form>
  );
}

export default Location;
