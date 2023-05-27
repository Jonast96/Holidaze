/**
 * This is the main entry point of the React application.
 *
 * @module Main
 *
 * @requires react
 * @requires react-dom/client
 * @requires react-router-dom
 * @requires react-hotjar
 * @requires App
 * @requires UserProvider from Context component
 *
 * @constant {number} HOTJAR_ID - The unique ID for the Hotjar application.
 *
 * @see {@link https://www.hotjar.com/ Hotjar}
 *
 * The application is wrapped inside UserProvider and BrowserRouter components.
 * UserProvider is a context provider which is used to share user data across components.
 * BrowserRouter is a router implementation that uses HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
 *
 * Hotjar is initialized with HOTJAR_ID and 6 as version number to track and analyze user behavior.
 *
 * The rendered app is attached to the root div of the index.html file.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/Context";
import { hotjar } from "react-hotjar";
const HOTJAR_ID = 3482497;

hotjar.initialize(HOTJAR_ID, 6);
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
);
