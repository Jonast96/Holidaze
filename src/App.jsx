import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom.scss";
import "./styles/styles.scss";

import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./components/home/Index"));
const Header = lazy(() => import("./components/header/Header"));
const Venue = lazy(() => import("./components/venue/Venue"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Loading = lazy(() => import("./components/404_loading_etc/Loading"));
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
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/venue/:id" element={<Venue />} />
          </Routes>
        </Layout>
      </Suspense>
    </>
  );
}

export default App;
