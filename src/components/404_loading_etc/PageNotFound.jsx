import React from "react";
import "./404.scss";

/**
 * `PageNotFound` is a functional component that displays a 404 error message.
 * It accepts a prop, `errorMessage`, which can be used to customize the error message.
 *
 * If `errorMessage` is not provided, the default error message "Page not found" is displayed.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.errorMessage - The custom error message to display.
 *
 * @example
 * return (
 *   <PageNotFound errorMessage="Sorry, we couldn't find that page." />
 * )
 */
function PageNotFound(props) {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">
          {props.errorMessage ? props.errorMessage : "Page not found"}
        </p>
        <a href="/" className="not-found-link">
          Go back to Home
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
