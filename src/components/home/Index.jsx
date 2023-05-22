import Hero from "./Hero";
import SecondHero from "./SecondHero";
import "./home.scss";
import useApiCall from "../../hooks/useApiCall";
import FeaturedVenues from "./FeateuredVenues";
import Loading from "../404_loading_etc/Loading";
import PageNotFound from "../404_loading_etc/PageNotFound";
import { useState, useEffect } from "react";
function Index() {
  const [filteredData, setFilteredData] = useState();
  const [sorting, setSorting] = useState("");
  const { data, loading, error } = useApiCall(
    sorting
      ? `https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true${sorting}`
      : "https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true"
  );

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <PageNotFound />;

  return (
    <main className="home">
      <Hero data={data} setFilteredData={setFilteredData} />
      <SecondHero />
      <FeaturedVenues
        setSorting={setSorting}
        data={filteredData ? filteredData : data}
      />
    </main>
  );
}

export default Index;
