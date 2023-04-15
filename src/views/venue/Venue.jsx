import { useParams } from "react-router-dom";
import useApiCall from "../../hooks/useApiCall";
import LoadingPage from "../../components/Loading";
import PageNotFound from "../../components/PageNotFound";

export default function Venue() {
  const params = useParams();
  console.log(params.id);

  // Modify the URL to force an error
  const { data, loading, error } = useApiCall(
    `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}`
  );
  if (loading) return <LoadingPage />;
  if (error) return <PageNotFound errorMessage={error.message} />;
  console.log(data);
  return <h1>{data.name}</h1>;
}
