import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getNames } from "country-list";
import useDebounce from "../../hooks/useDebounce";

/**
 * The `Location` functional component is a form to gather and handle location information about a venue.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.location - An object containing the location information.
 * @param {Function} props.setLocation - A function to set the location.
 *
 * @example
 * const location = {
 *    address: "123 Main Street",
 *    city: "Anytown",
 *    zip: "12345",
 *    country: "USA",
 *    continent: "North America",
 *    lat: 38.8977,
 *    lng: 77.0365
 * };
 * const setLocation = newLocation => console.log(newLocation);
 * return (
 *   <Location location={location} setLocation={setLocation} />
 * );
 *
 * @returns {ReactElement} The `Location` component, a form for inputting and handling location information.
 */
function Location({ location, setLocation }) {
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
      [name]:
        name === "lat" || name === "lng"
          ? value
            ? parseFloat(value)
            : ""
          : value,
    });
  };

  const [locationName, setLocationName] = useState("");
  const [locationData, setLocationData] = useState({});
  const debouncedSearchTerm = useDebounce(locationName, 1000);

  function getLocation() {
    fetch(
      `https://nominatim.openstreetmap.org/search?city=${locationName}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let lat = parseFloat(data[0].lat);
          let lng = parseFloat(data[0].lon);
          setLocationData({ lat, lng });
          console.log(lat, lng);
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      getLocation();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (locationData.lat && locationData.lng) {
      setLocation({
        ...location,
        lat: locationData.lat,
        lng: locationData.lng,
      });
    }
  }, [locationData]);

  return (
    <Form>
      <h4>Location data</h4>

      <Form.Group as={Col} controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={location.address}
          onChange={(event) => {
            handleLocationChange(event);
            setLocationName(event.target.value);
          }}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={location.city || ""}
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

      <Form.Group as={Col} controlId="lat">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="number"
          name="lat"
          value={location.lat}
          onChange={handleLocationChange}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="lng">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="number"
          name="lng"
          value={location.lng}
          onChange={handleLocationChange}
        />
      </Form.Group>
    </Form>
  );
}

export default Location;
