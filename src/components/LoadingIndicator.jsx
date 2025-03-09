import React from "react";
import "./loading-indicator.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <div id="outer">
        <div id="middle">
          <div id="inner"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
