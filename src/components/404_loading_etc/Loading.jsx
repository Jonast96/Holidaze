import React from "react";
import { Puff } from "react-loader-spinner";
import "./loading.scss";

/**
 * `LoadingPage` is a functional component that displays a loading spinner.
 * It makes use of the `Puff` component from `react-loader-spinner`.
 *
 * @component
 * @example
 * return (
 *   <LoadingPage />
 * )
 */
const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Puff color="#00BFFF" height={100} width={100} timeout={3000} />
    </div>
  );
};

export default LoadingPage;
