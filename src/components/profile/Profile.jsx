import React from "react";
import Container from "react-bootstrap/Container";
import useApiCall from "../..//hooks//useApiCall";
import VenueHost from "./venueHost/VenueHost";
import Guest from "./guest/Guest";
import Loading from "../404_loading_etc/Loading";
import PageNotFound from "../404_loading_etc/PageNotFound";
import "./profile.scss";

/**
 * `Profile` component represents the profile of a user.
 * It includes details of the user and his/her bookings, and also allows a user to edit their information.
 * The profile view changes based on the role of the user i.e. either a VenueHost or a Guest.
 *
 * @component
 *
 * @example
 * return (
 *   <Profile />
 * );
 *
 * @returns {ReactElement} The Profile component representing a user's profile.
 */
export default function Profile() {
  let user = JSON.parse(localStorage.getItem("user"));

  async function editInfo() {
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
    `https://api.noroff.dev/api/v1/holidaze/profiles/${user?.name}?_bookings=true&_venues=true`,
    { Authorization: "Bearer " + user?.token }
  );
  if (loading) return <Loading />;
  if (error) return <PageNotFound />;
  console.log(data);
  return (
    <Container className="mt-5">
      {user?.isVenueManager ? (
        <VenueHost
          venues={data.venues}
          data={data}
          editInfo={editInfo}
          bookings={data.bookings}
        />
      ) : data.bookings.length > 0 ? (
        <Guest data={data} editInfo={editInfo} bookings={data.bookings} />
      ) : (
        "There are currently no bookings for this user"
      )}
    </Container>
  );
}
