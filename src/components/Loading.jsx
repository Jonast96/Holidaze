import React from "react";
import { Puff } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Puff
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} // 3 secs
      />
    </div>
  );
};

export default LoadingPage;
