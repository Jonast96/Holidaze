import heroImg from "../../assets/media/hero.jpg";

export default function Hero() {
  return (
    <section className="position-relative mt-5 mainHero">
      <img className="img-fluid" src={heroImg} alt="" />
      <div className="overlay"></div>
      <div className="hero-center p-3">
        <h1 className="fw-light ">Your home, away from home</h1>
      </div>
    </section>
  );
}
