import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom.scss";
import "./styles/styles.scss";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Venue from "./views/venue/Venue";
import Index from "./views/home/Index";
import Profile from "./components/profile/Profile";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/venue/:id" element={<Venue />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
