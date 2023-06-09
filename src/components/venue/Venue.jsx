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

/**
 * Venue component.
 *
 * This component is responsible for displaying a specific venue. The venue is determined by the `id` parameter in the route.
 * It displays various information about the venue and provides options to edit or delete the venue if the current user is the owner of the venue.
 * It fetches venue data using `useApiCall` hook and the data is kept in the `payload` state.
 * The state is updated in response to changes in the `data` returned from the `useApiCall` hook.
 * This component also contains handlers for updating the venue information (`handleUpdateRequest`) and deleting the venue (`handleDeleteRequest`).
 * Changes in the input fields of location and info sections are handled by `handleLocationChange` and `handleInfoChange` functions respectively which update the `payload` state.
 * If the data is still loading, it renders the `LoadingPage` component. If there is an error, it renders the `PageNotFound` component.
 *
 * @returns {JSX.Element} Venue component.
 */
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
        name: data.name,
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
      if (response.ok) {
        window.location.href = `/venue/${params.id}`;
      } else {
        alert(json.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteRequest() {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.ok);
    if (response.ok) {
      window.location.href = "/";
    }
  }

  function handleLocationChange(event, field) {
    let value = event.target.value;
    if (field === "lat" || field === "lng") {
      value = parseFloat(value);
    }
    const newPayload = {
      ...payload,
      location: {
        ...payload.location,
        [field]: value,
      },
    };
    setPayload(newPayload);
  }

  function handleInfoChange(event, field) {
    let value = event.target.value;
    if (field === "price" || field === "maxGuests") {
      value = parseInt(value);
    }
    const newPayload = {
      ...payload,
      [field]: value,
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
            <Button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this venue? This action cannot be undone."
                  )
                ) {
                  handleDeleteRequest();
                }
              }}
              className="deleteBtn fw-normal"
            >
              Delete
            </Button>
          </div>
        ) : null}
        <Info
          handleLocationChange={handleLocationChange}
          handleInfoChange={handleInfoChange}
          payload={payload}
          name={data.name}
          maxGuests={data.maxGuests}
          description={data.description}
          owner={data.owner}
          meta={data.meta}
          location={data.location}
          showEdit={true}
        />

        <Booking data={data} />
      </Row>
    </Container>
  );
}
