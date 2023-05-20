import React from "react";
import Container from "react-bootstrap/Container";
import useApiCall from "../..//hooks//useApiCall";
import VenueHost from "./venueHost/VenueHost";
import Guest from "./guest/Guest";
import Loading from "../404_loading_etc/Loading";
import PageNotFound from "../404_loading_etc/PageNotFound";
import "./profile.scss";
export default function Profile() {
  let user = JSON.parse(localStorage.getItem("user"));

  async function editInfo(updatedMedia) {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${user?.name}/media`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user?.token,
          },
          body: JSON.stringify({ avatar: updatedMedia }),
        }
      );
      user.avatar = updatedMedia;
      localStorage.setItem("user", JSON.stringify(user));
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        location.reload();
      } else {
        alert(`${data.errors[0].code}: ${data.errors[0].message}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { data, loading, error } = useApiCall(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${user?.name}?_bookings=true`,
    { Authorization: "Bearer " + user?.token }
  );
  if (loading) return <Loading />;
  if (error) return <PageNotFound />;
  console.log(data);
  return (
    <Container className="mt-5">
      {user?.isVenueManager ? (
        <VenueHost data={data} />
      ) : data.bookings.length > 0 ? (
        <Guest data={data} editInfo={editInfo} bookings={data.bookings} />
      ) : (
        "There are currently no bookings for this user"
      )}
    </Container>
  );
}
