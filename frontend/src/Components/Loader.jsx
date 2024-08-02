import React from "react";
import { Grid } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <Grid
  visible={true}
  height="80"
  width="80"
  color="#8e44ad"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />
    </div>
  );
};

export default Loader;
