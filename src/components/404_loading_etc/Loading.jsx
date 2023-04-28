import React from "react";
import { Puff } from "react-loader-spinner";
import "./loading.scss";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Puff color="#00BFFF" height={100} width={100} timeout={3000} />
    </div>
  );
};

export default LoadingPage;
