import useApiCall from "../../hooks/useApiCall";
import LoadingPage from "../../components/404_loading_etc/Loading";
import Hero from "./Hero";
import SecondHero from "./SecondHero";
import "./home.scss";
import FeaturedVenues from ".//FeateuredVenues";
function Index() {
  const { data, loading, error } = useApiCall(
    "https://api.noroff.dev/api/v1/holidaze/venues"
  );
  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  return (
    <main className="home">
      <Hero />
      <SecondHero />
      <FeaturedVenues />
    </main>
  );
}

export default Index;
