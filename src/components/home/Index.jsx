import Hero from "./Hero";
import SecondHero from "./SecondHero";
import "./home.scss";
import useApiCall from "../../hooks/useApiCall";
import FeaturedVenues from "./FeateuredVenues";
function Index() {
  const { data, loading, error } = useApiCall(
    "https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true&limit=12"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <main className="home">
      <Hero data={data} />
      <SecondHero />
      <FeaturedVenues data={data} />
    </main>
  );
}

export default Index;
