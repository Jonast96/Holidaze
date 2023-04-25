import Hero from "./Hero";
import SecondHero from "./SecondHero";
import "./home.scss";
import FeaturedVenues from "./FeateuredVenues";
function Index() {
  return (
    <main className="home">
      <Hero />
      <SecondHero />
      <FeaturedVenues />
    </main>
  );
}

export default Index;
