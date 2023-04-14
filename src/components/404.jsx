import React from "react";
import ".././styles/404.scss";

function PageNotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Oops! Page not found.</p>
        <a href="/" className="not-found-link">
          Go back to Home
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
