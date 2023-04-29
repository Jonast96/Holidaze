import React from "react";
import Container from "react-bootstrap/Container";
import useApiCall from "../..//hooks//useApiCall";
export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, loading, error } = useApiCall(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/venues`,
    { Authorization: "Bearer " + user.token }
  );
  console.log(error);

  console.log(data);
  return (
    <Container className="mt-5">
      <h1>Profile for {user.name}</h1>
    </Container>
  );
}
