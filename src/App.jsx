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

/**
 * The main `App` component of the application. It imports and uses a variety of components
 * and routes to different paths, using the `react-router-dom` package.
 * It uses `Suspense` from React for lazy loading of components.
 *
 * @component
 * @example
 * function Component() {
 *   return <App />;
 * }
 */
function App() {
  /**
   * The `Layout` component, that acts as a layout wrapper for its children components.
   * It includes the `Header`, `Footer` components, and a main section for the content which
   * is filled by whatever is passed as `props.children`.
   *
   * @function
   * @param {Object} props - The properties object, expecting `children`.
   * @param {ReactNode} props.children - The children components to be rendered within this layout.
   * @returns {ReactElement} Returns the main layout of the page including `Header`, `Footer`, and `props.children`.
   */
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
