import PageNotFound from "../../components/404_loading_etc/PageNotFound";
import { useParams } from "react-router-dom";
import useApiCall from "../../hooks/useApiCall";
import LoadingPage from "../../components/404_loading_etc/Loading";
import Container from "react-bootstrap/Container";
import "./venue.scss";
import Images from "./Images";
import Info from "./Info";
import Row from "react-bootstrap/Row";
import Booking from "./Booking";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Venue() {
  const params = useParams();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser) {
      setUser(localStorageUser);
    }
  }, []);

  const { data, loading, error } = useApiCall(
    `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}?_owner=true&_bookings=true
    `
  );

  const [payload, setPayload] = useState({
    location: {},
    meta: {},
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [],
  });

  useEffect(() => {
    if (data) {
      setPayload({
        location: {
          address: data.location.address,
          city: data.location.city,
          continent: data.location.continent,
          country: data.location.country,
          lat: data.location.lat,
          lng: data.location.lng,
          zip: data.location.zip,
        },
        meta: {
          wifi: data.meta.wifi,
          parking: data.meta.parking,
          pets: data.meta.pets,
          breakfast: data.meta.breakfast,
        },
        name: "changed name",
        description: data.description,
        price: data.price,
        maxGuests: data.maxGuests,
        media: data.media,
      });
    }
  }, [data]);

  if (loading) return <LoadingPage />;
  if (error) return <PageNotFound errorMessage={error.message} />;

  let token = null;
  if (user) {
    token = user.token;
  }
  async function handleUpdateRequest() {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();
      console.log(json);
      console.log(response.ok);
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(event, field) {
    const newPayload = {
      ...payload,
      location: {
        ...payload.location,
        [field]: event.target.value,
      },
    };
    setPayload(newPayload);
  }

  return (
    <Container className="mt-5 mainContainer">
      <Images media={data.media} />
      <Row>
        {user && user.name === data.owner.name ? (
          <div className="changeButtons ">
            <Button
              onClick={handleUpdateRequest}
              className="editBtn btn-secondary fw-light"
            >
              Save changes
            </Button>
            <Button className="deleteBtn fw-normal">Delete</Button>
          </div>
        ) : null}
        <Info
          handleInputChange={handleInputChange}
          payload={payload}
          name={data.name}
          maxGuests={data.maxGuests}
          description={data.description}
          owner={data.owner}
          meta={data.meta}
          location={data.location}
        />

        <Booking data={data} />
      </Row>
    </Container>
  );
}
