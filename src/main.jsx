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
