import React from "react";
import Container from "react-bootstrap/Container";
import useApiCall from "../..//hooks//useApiCall";
import VenueHost from "./venueHost/VenueHost";
import Guest from "./guest/Guest";
import Loading from "../404_loading_etc/Loading";
import PageNotFound from "../404_loading_etc/PageNotFound";
import "./profile.scss";
export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { data, loading, error } = useApiCall(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${user?.name}?_bookings=true`,
    { Authorization: "Bearer " + user?.token }
  );
  if (loading) return <Loading />;
  if (error) return <PageNotFound />;
  console.log(error);

  console.log(data);
  console.log(user);
  return (
    <Container className="mt-5">
      {user?.isVenueManager ? <VenueHost data={data} /> : <Guest data={data} />}
    </Container>
  );
}
