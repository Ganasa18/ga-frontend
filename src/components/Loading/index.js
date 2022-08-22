import React from "react";
import { Rings } from "react-loader-spinner";
import "./style.less";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <Rings ariaLabel="loading" color="#FFFFFF" height={550} width={80} />
    </div>
  );
};

export default Loading;
