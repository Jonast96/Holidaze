import PageNotFound from "../../components/404_loading_etc/PageNotFound";
import { useParams } from "react-router-dom";
import useApiCall from "../../hooks/useApiCall";
import LoadingPage from "../../components/404_loading_etc/Loading";
import Container from "react-bootstrap/Container";
import "./venue.scss";
import Images from "./Images";
import Info from "./Info";

export default function Venue() {
  const params = useParams();
  console.log(params.id);

  const { data, loading, error } = useApiCall(
    `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}?_owner=true&_bookings=true
    `
  );
  if (loading) return <LoadingPage />;
  if (error) return <PageNotFound errorMessage={error.message} />;
  console.log(data);
  return (
    <Container className="mt-5 mainContainer">
      <Images data={data} />
      <Info data={data} />
    </Container>
  );
}
