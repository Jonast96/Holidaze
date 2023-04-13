import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom.scss";
import "./styles/styles.scss";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Venue from "./views/venue/Venue";
import Index from "./views/home/Index";
import GuestProfile from "./views/guestProfile/GuestProfile";
import HostProfile from "./views/hostProfile/HostProfile";

function App() {
  function Layout(props) {
    return (
      <>
        <Header />
        {props.children}
      </>
    );
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/hostProfile" element={<HostProfile />} />
          <Route path="/guestProfile" element={<GuestProfile />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
