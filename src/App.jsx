import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom.scss";
import "./styles/styles.scss";
import Footer from "./components/footer/Footer";

import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./components/home/Index"));
const Header = lazy(() => import("./components/header/Header"));
const Venue = lazy(() => import("./components/venue/Venue"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Loading = lazy(() => import("./components/404_loading_etc/Loading"));
const CreateVenue = lazy(() => import("./components/createVenue/CreateVenue"));
const BecomeHost = lazy(() => import("./components/becomeHost/BecomeHost"));
function App() {
  function Layout(props) {
    return (
      <>
        <Header />
        <main className="content">{props.children}</main>
        <Footer />
      </>
    );
  }

  return (
    <div className="app">
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/venue/:id" element={<Venue />} />
            <Route path="/createVenue" element={<CreateVenue />} />
            <Route path="/becomeHost" element={<BecomeHost />} />
          </Routes>
        </Layout>
      </Suspense>
    </div>
  );
}

export default App;
